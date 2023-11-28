require('dotenv').config()
const bcrypt = require("bcrypt")
const pool = require('./db/db.ts'); // Import the pool
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

import express from "express";
import { Account, Comment, Post, UserCommunityRole, Community } from "./db/db_types";


const app = express();
app.use(jsonParser)
const port = 3000;

//So We Don't Get Blocked
var cors = require('cors')
app.use(cors())

//USER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Creates user object in db
app.post('/sign_up', async (req, res) => {
  // Ensuring we have a req.body
  if (!req.body || Object.keys(req.body).length === 0) {
      return res.sendStatus(400);
  }

  // Gathering all the info
  const { emailAddress, password, username, profilePicture } = req.body;

  try {
      // Check to see if user already exists in the db
      const [results, fields] = await pool.promise().query('SELECT emailAddress FROM account WHERE emailAddress = ?', [emailAddress]);

      if (results.length >= 1) {
          return res.sendStatus(403); // User already exists
      }

      // User does not exist, proceed with password hashing and storing the new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(String(password), String(salt));

      const newUser = {
          emailAddress: emailAddress,
          username: username,
          password: hashedPassword,
          profilePicture: profilePicture,
          reputation: 0
      };

      // Insert user into db (with hashed password)
      await pool.promise().query('INSERT INTO account SET ?', newUser);

      return res.sendStatus(201); // Successfully created the user
  } catch (error) {
      console.error('An error occurred: ', error);
      return res.sendStatus(500); // Internal server error
  }
});


// Creates a user object (basically signs someone up)

// Authenticates a user for logging in purposes
app.post('/log_in', async (req, res) => {
  // Ensuring we have a req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400)
  }

  const password = req.body.password;
  const emailAddress = req.body.email
  try {
    // Execute the query and wait for the result
    const [results, fields] = await pool.promise().query(`SELECT * FROM account WHERE emailAddress = ?`, [emailAddress]);

    if (results.length === 0) {
        return res.status(403).send("Error: User does not exist in database");
    }

    const currUserInfo = results[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(String(password), String(currUserInfo.password));
    if (!isPasswordValid) {
        return res.status(401).send("Incorrect password for user");
    }

    // Now that we know the user has the correct log in info, we can send back their userID, which the frontend will use
    return res.json({userID: currUserInfo.userID})

  } catch (error) {
      console.error('An error occurred: ', error);
      return res.status(500).send('An error has occurred within the server');
  }
});

// add one to user reputation
app.put('/decrement_user_rep', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID} = req.body

  try {
    const [results, fields] = await pool.promise().query(`UPDATE account SET reputation=reputation - 1 WHERE userID="?"`, [userID])
    return res.json(results)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
})


// subtract one to user reputation
app.put('/increment_user_rep', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID} = req.body

  try {
    const [results, fields] = await pool.promise().query(`UPDATE account SET reputation = reputation + 1 WHERE userID=?`, [userID])
    return res.json(results)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
})

// Returns user data (including communities they're subbed to)
app.get('/user', async (req, res) => {
  const {userID} = req.query; 
  
  const sqlStatement = `
  SELECT account.emailAddress, account.username, account.profilePicture, account.reputation, community.name as communityName  
  FROM userCommunityRole
  JOIN account on account.userID = userCommunityRole.userID
  JOIN community on community.communityID = userCommunityRole.communityID
  WHERE userCommunityRole.userID = ?
  `
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [userID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Adds a community to the list of communities users are in
app.post('/subscribeToCommunity', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;
  
  const subToComm:UserCommunityRole = {
    role: "member",
    userID: userID,
    communityID: communityID,
  }

  try {
    const [results, fields] =  await pool.promise().query('INSERT INTO userCommunityRole SET ?', [subToComm])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }

});

//Changes the profile picture of the user once profile has already been created
app.put('/change_profile_pic', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, photoURL} = req.body
  try {
    const [results, fields] =  await pool.promise().query('UPDATE account SET profilePicture = ? WHERE userID = ?', [photoURL, userID])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Deletes User
app.delete('/delete_user', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM account WHERE userID=?', [userID])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//////////////////////////////////////////////////////////////////////////////////////COMMUNITY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Create A Community Object in db
app.post('/community', async (req, res) => {
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  //Gather community info
  const {userID, communityName, description, picture} = req.body;

  try {
    // Check to see if community already exists in the db
    const [results, fields] = await pool.promise().query('SELECT name FROM community WHERE name = ?', [communityName]);

    if (results.length >= 1) {
        return res.sendStatus(403).send("Community Already Exists"); // Community already exists
    }

    // Community Exists, create the community

    const newCommunity = {
        name: communityName,
        description: description,
        picture: picture
    };

    await pool.promise().query('INSERT INTO community SET ?', newCommunity);
    const communityID = await pool.promise().query('SELECT communityID FROM community WHERE name = ?', [communityName]);
    console.log(communityID);

    const subToComm:UserCommunityRole = {
      role: "owner",
      userID: userID,
      communityID: communityID[0][0].communityID,
    }
  
    try {
      const [results, fields] =  await pool.promise().query('INSERT INTO userCommunityRole SET ?', [subToComm])
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.sendStatus(500)
    }

    return res.sendStatus(201); // Successfully created the user



    //Create the user role and give it the role owner for this specific community


  } catch (error) {
      console.error('An error occurred: ', error);
      return res.sendStatus(500); // Internal server error
  }
});

//Gets the all the data from a community from the database
app.get('/community', async (req, res) => {
  const {communityID} = req.query;
  
  const sqlStatement = `
  SELECT *
  FROM community
  WHERE communityID = ` + communityID;
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [communityID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Returns a json of All Communities
app.get('/allCommunities', async (req, res) => {
  
  const sqlStatement = `
  SELECT *
  FROM community;`
  try {
    const [results, fields] = await pool.promise().query(sqlStatement)
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Allows moderators to edit description of community
app.put('/editDescription', (req, res) => {
  const {userID, communityID, description} = req.query; 

  // res -> status code
  
});

//Changes the profile picture of the community
app.put('/changeCommunityPic', (req, res) => {
  // do this things with that
  const {userID, communityID, photoURL} = req.body
  // res -> status code
});

//Gives user moderator
app.put('/makeMod', (req, res) => {
  // do this things with that
  const {communityID, userID} = req.body
  // res -> status code
});

//Bans User From Community
app.delete('/banUser', (req, res) => {
  // do this things with that
  const {communityID, userID} = req.body
  // res -> status code
});

//Deletes Community
app.delete('/user', (req, res) => {
  const {userID, communityID} = req.body
  // res -> status code
});

//////////////////////////////////////////////////////////////////////////////////////COMMUNITY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Creates A Post
app.post('/post', (req, res) => {
  const {communityID,userID, title, type, body, tags} = req.body;
  // res -> status code
});

//Gets Post Data
app.get('/post', (req, res) => {
  const {postID} = req.query;
  // res -> JSON object
});

//Edit Body Of Post
app.put('/post', (req, res) => {
  const {userID, postID, data, tags} = req.query;
  // res -> status code
});

//Upvotes Post
app.put('/upvotePost', (req, res) => {
  const {userID,postID} = req.query;
  // res -> status code
});

//Downvotes Post
app.put('/downvotePost', (req, res) => {
  const {userID, postID} = req.query;
  // res -> status code
});

//Deletes Post
app.delete('/user', (req, res) => {
  const {userID, postID} = req.body
  // res -> status code
});

//////////////////////////////////////////////////////////////////////////////////////Comments\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//Creates A Comment (no reply)
app.post('/comment', (req, res) => {
  const {userID, data, postID} = req.body;
  // res -> status code
});

//Creates A Comment (as reply)
app.post('/commentReply', (req, res) => {
  const {userID, data, parentID} = req.body;
  // res -> status code
});

//Gets Comment
app.get('/comment', (req, res) => {
  const {userID, commentID} = req.query;
  // res -> JSON object
});

//editsComment
app.put('/editComment', (req, res) => {
  const {userID, commentID, data} = req.query;
  // res -> status Code
});

//Upvotes Comment
app.put('/upvoteComment', (req, res) => {
  const {userID, commentID} = req.query;
  // res -> status code
});

//Downvotes Comment
app.put('/downvoteComment', (req, res) => {
  const {userID, commentID} = req.query;
  // res -> status code
});

/////////////////////////////////////////////////////////////////////////////NON CLASS RELATED ROUTES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res) => {
  // do this things with that
  res.send("We did it")
});

app.get('/home', (req, res) => {
  // do this things with that
  res.send("We did it")
});

app.post('/login', (req, res) => {
  const data = req.body;
  // do this things with that
  res.send('Logged in!');
});


app.post('/signup', (req, res) => {
  const data = req.body;
  res.send('Signed up!');
});

app.get('/home', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const ind = req.query["index"];
  res.json({
    0: ["25 post objects"]
  })
});

// route to show the posts in a community based on some offset
//Currently Not Working
/*app.get('/comm', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const community = req.params.community;
  const ind = req.params.index;
  res.json({
    0: ["25 post objects"]
  })
});*/

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});