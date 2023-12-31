require('dotenv').config()
const bcrypt = require("bcrypt")
const pool = require('./db/db.ts'); // Import the pool
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

import express from "express";
import { Account, Comment, Post, UserCommunityRole, Community } from "./db/db_types";


const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
  const { password, username, profilePicture } = req.body;
  const emailAddress = req.body.email;

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
          //reputation: 0
      };

      // Insert user into db (with hashed password)
      const [results1, fields1] = await pool.promise().query('INSERT INTO account SET ?', [newUser]);

      return res.json(results1.insertId)
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
  console.log("Email Address" + emailAddress)
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
    return res.json({userID: currUserInfo.userID, username: currUserInfo.username})

  } catch (error) {
      console.error('An error occurred: ', error);
      return res.status(500).send('An error has occurred within the server');
  }
});

// Returns user data 
app.get('/user', async (req, res) => {
  const {userID} = req.query; 
  
  const sqlStatement = `
  SELECT accountWithReputation.emailAddress, accountWithReputation.username, accountWithReputation.profilePicture, accountWithReputation.reputation
  FROM accountWithReputation
  WHERE accountWithReputation.userID = ?
  `
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [userID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Returns a JSON of all communities the user is subscribed to
app.get('/userCommunities', async (req, res) => {
  const {userID} = req.query; 
  
  const sqlStatement = `
  SELECT communityWithSubscribers.communityID, communityWithSubscribers.name, communityWithSubscribers.description, communityWithSubscribers.picture, communityWithSubscribers.subscribers
  FROM userCommunityRole
  JOIN communityWithSubscribers on communityWithSubscribers.communityID = userCommunityRole.communityID
  WHERE userCommunityRole.userID = ? AND role != "banned"
  `
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [userID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Returns a JSON of all posts the user created
app.get('/userPosts', async (req, res) => {
  const {userID} = req.query; 
  
  const sqlStatement = `
  SELECT *
  FROM postWithReputation
  WHERE postWithReputation.userID = ?
  ORDER BY date DESC LIMIT 10
  `
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [userID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Returns a JSON of all comments the user created
app.get('/userComments', async (req, res) => {
  const {userID} = req.query; 
  
  const sqlStatement = `
  SELECT *
  FROM commentWithReputation
  WHERE commentWithReputation.userID = ?
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
    const [results, fields] = await pool.promise().query('SELECT * FROM userCommunityRole WHERE userID = ? AND communityID = ?', [userID, communityID]);

    if (results.length >= 1) {
      return res.sendStatus(200); // Role already exists
    }
    await pool.promise().query('INSERT INTO userCommunityRole SET ?', [subToComm])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }

});

//Removes a community from the list of communities users are in
app.delete('/unsubscribeToCommunity', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM userCommunityRole WHERE userID = ? AND communityID = ? AND role != "banned"', [userID, communityID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Check a user's role in community
app.get('/checkRole', async (req, res) => {

  const userID = req.query.userID
  const communityID = req.query.communityID

  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM userCommunityRole WHERE userID = ? AND communityID = ?', [userID, communityID]);

    if (results.length >= 1) {
      return res.send(results[0].role); // Role already exists
    }
    return res.send("None")
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

//Gets the all the data from a community from the database given communityID
app.get('/community', async (req, res) => {
  const {communityID} = req.query;
  
  const sqlStatement = `
  SELECT *
  FROM communityWithSubscribers
  WHERE communityID = ` + communityID;
  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [communityID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Get communityID given name
app.get('/communityID', async (req, res) => {
  const {name} = req.query;
  const sqlStatement = `
  SELECT communityID
  FROM community
  WHERE name = ?`;
  console.log(sqlStatement);
  try {
    const [results, fields] = await pool.promise().query(sqlStatement,[name]);
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
  FROM communityWithSubscribers;`
  try {
    const [results, fields] = await pool.promise().query(sqlStatement)
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Allows moderators to edit description of community
app.put('/editDescription', async(req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {communityID, description} = req.body; 
  
  try {
    const [results, fields] =  await pool.promise().query('UPDATE community SET description = ? WHERE communityID = ?', [description, communityID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Changes the profile picture of the community
app.put('/changeCommunityPic', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {communityID, photoURL} = req.body; 
  
  try {
    const [results, fields] =  await pool.promise().query('UPDATE community SET picture = ? WHERE communityID = ?', [photoURL, communityID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Gives user moderator
app.post('/makeMod', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;
  
  const subToComm:UserCommunityRole = {
    role: "moderator",
    userID: userID,
    communityID: communityID,
  }
  
  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM userCommunityRole WHERE userID = ? AND communityID = ?', [userID, communityID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE userCommunityRole SET role = "moderator" WHERE userID = ? AND communityID = ?', [userID, communityID])
      return res.sendStatus(200); // Role updated
    }

    await pool.promise().query('INSERT INTO userCommunityRole SET ?', [subToComm])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Bans User From Community
app.post('/banUser', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;
  
  const subToComm:UserCommunityRole = {
    role: "banned",
    userID: userID,
    communityID: communityID,
  }
  
  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM userCommunityRole WHERE userID = ? AND communityID = ?', [userID, communityID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE userCommunityRole SET role = "banned" WHERE userID = ? AND communityID = ?', [userID, communityID])
      return res.sendStatus(200); // Role updated
    }

    await pool.promise().query('INSERT INTO userCommunityRole SET ?', [subToComm])
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Unbans User From Community
app.delete('/unbanUser', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM userCommunityRole WHERE userID = ? AND communityID = ? AND role = "banned"', [userID, communityID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Deletes Community
app.delete('/deleteCommunity', async(req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {communityID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM community WHERE communityID = ?', [communityID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//////////////////////////////////////////////////////////////////////////////////////POSTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// retrieve ten most recent posts
app.get("/home", async (req, res) => {
  // TODO: UPDate this and add likes and dislikes
  interface postReturnObject  {
    title: String,
    type: String,
    like: Number,
    dislike: Number,
    dayPosted: Date,
    content: String,
    tags: [String],
    name: String
  }

  const sqlStatement = `
  SELECT postWithReputation.*, account.username, community.name
  FROM postWithReputation 
  JOIN account on account.userID = postWithReputation.userID
  JOIN community on community.communityID = postWithReputation.communityID
  ORDER BY date DESC LIMIT 10 `
  try {
    const [results, fields] = await pool.promise().query(sqlStatement)
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    console.log(results)
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
})

// retrieve all posts in a given community
app.get("/posts_in_community", async (req, res) => {
  // TODO: Update this and add likes and dislikes
  
  const {communityID} = req.query;
  interface postReturnObject  {
    title: String,
    type: String,
    like: Number,
    dislike: Number,
    dayPosted: Date,
    content: String,
    tags: [String]
  }
  const sqlStatement = `
  SELECT postWithReputation.*, account.username, community.name
  FROM postWithReputation 
  JOIN account on account.userID = postWithReputation.userID
  JOIN community on community.communityID = postWithReputation.communityID
  WHERE postWithReputation.communityID = ?
  ORDER BY date DESC LIMIT 10`

  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [communityID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    console.log(results)
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
})



//Creates A Post
app.post('/post', async (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  const {communityID, userID, title, body, flair, postType} = req.body;

  try {

    const newPost = {
        communityID: communityID,
        userID: userID,
        title: title,
        postType: postType,
        body: body,
        flair: flair,
        date: new Date
    };

    await pool.promise().query('INSERT INTO post SET ?', newPost);

    return res.sendStatus(201); // Successfully created the user


  } catch (error) {
      console.error('An error occurred: ', error);
      return res.sendStatus(500); // Internal server error
  }
});

//Gets Post Data
app.get('/post', async (req, res) => {
  const {postID} = req.query; 
  
  const sqlStatement = `
  SELECT postWithReputation.*, account.username, community.name
  FROM postWithReputation 
  JOIN account on account.userID = postWithReputation.userID
  JOIN community on community.communityID = postWithReputation.communityID
  WHERE postID = ?`

  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [postID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(results[0])
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Gets Recent Posts for User
app.get('/userPosts', async (req, res) => {
  const {userID} = req.query; 
  
  try {
    const [results, fields] = await pool.promise().query(`SELECT postWithReputation.*, community.name FROM postWithReputation JOIN community on community.communityID = postWithReputation.communityID WHERE postWithReputation.userID = ? ORDER BY date DESC LIMIT 5`, [userID])
    return res.json(results)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Edit Body Of Post
app.put('/editPost', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {postID, body, flair} = req.body;
  
  try {
    const [results, fields] =  await pool.promise().query('UPDATE post SET body = ?, flair =? WHERE postID = ?', [body, flair, postID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Upvotes Post
app.post('/upvotePost', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, postID} = req.body

  

  const newVote = {
    userID: userID,
    postID:  postID,
    vote: 1
  };

  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM postVote WHERE userID = ? AND postID = ?', [userID, postID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE postVote SET vote = 1 WHERE userID = ? AND postID = ?', [userID, postID])
      return res.sendStatus(200); // Vote updated
    }
    await pool.promise().query('INSERT INTO postVote SET ?', [newVote])
    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
});

//Downvotes Post
app.post('/downvotePost', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, postID} = req.body

  

  const newVote = {
    userID: userID,
    postID:  postID,
    vote: -1
  };

  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM postVote WHERE userID = ? AND postID = ?', [userID, postID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE postVote SET vote = -1 WHERE userID = ? AND postID = ?', [userID, postID])
      return res.sendStatus(200); // Vote updated
    }
    await pool.promise().query('INSERT INTO postVote SET ?', [newVote])
    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
});

//Removes Vote on Post
app.delete('/removeCommentVote', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, postID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM postVote WHERE userID = ? AND postID = ?', [userID, postID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Deletes Post
app.delete('/deletePost', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {postID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM post WHERE postID = ?', [postID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//////////////////////////////////////////////////////////////////////////////////////Comments\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//Creates A Comment (no reply)
app.post('/comment', async (req, res) => {
  // Ensuring we have a req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, content, postID, date} = req.body;

  try {
    const [communityIDRows, fields] = await pool.promise().query('SELECT communityID FROM post WHERE postID = ?', [postID]);

    //handle when postID is not found in DB
    if (communityIDRows.length === 0) {
      return res.sendStatus(404);
    }

    const communityID = communityIDRows[0].communityID;

    const newComment = {
      content: content,
      communityID: communityID,
      userID: userID,
      postID: postID,
      datePosted: date
    };

    await pool.promise().query(`INSERT INTO comment SET ?`, newComment)
    return res.sendStatus(201);
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
  // res -> status code
});

//Creates A Comment (as reply)
app.post('/commentReply', async (req, res) => {
  // Ensuring we have a req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, content, parentID, date} = req.body;

  try {

    const [result, fields] = await pool.promise().query('SELECT communityID, postID FROM comment WHERE commentID = ?', [parentID]);

    //handle when commentID is not found in DB
    if (result.length === 0) {
      return res.sendStatus(404);
    }

    const communityID = result[0].communityID;
    const postID = result[0].postID;


    const newComment = {
      content: content,
      communityID: communityID,
      userID: userID,
      postID: postID,
      parentID: parentID,
      datePosted: date
    };

    await pool.promise().query(`INSERT INTO comment SET ?`, newComment)
    return res.sendStatus(201);
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
  // res -> status code
});

//Gets Comment
app.get('/comment', async (req, res) => {
  const {commentID} = req.query; 
  
  const sqlStatement = `
  SELECT commentWithReputation.*, account.username
  FROM commentWithReputation 
  JOIN account on account.userID = commentWithReputation.userID
  WHERE commentID = ?`

  try {
    const [results, fields] = await pool.promise().query(sqlStatement, [commentID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(results[0])
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Gets children from post
app.get('/children', async (req, res) => {
  const {postID} = req.query; 

  try {

    interface comment {
      content: string,
      communityID: number,
      userID: number,
      postID: number,
      datePosted: Date,
      commentID: number,
      parentID: number,
      reputation: number,
      username: string
    };

    const sqlStatement = `
    SELECT commentWithReputation.*, account.username
    FROM commentWithReputation 
    JOIN account on account.userID = commentWithReputation.userID
    WHERE postID = ? AND parentID IS NULL`
    const [parents, parentFields] = await pool.promise().query(
      sqlStatement,
      [postID]
    );

    const sqlStatement1 = `
    SELECT commentWithReputation.*, account.username
    FROM commentWithReputation 
    JOIN account on account.userID = commentWithReputation.userID
    WHERE parentID = ?`
    const promises = parents.map(async (parent: comment) => {
      const [children, childFields] = await pool
        .promise()
        .query(sqlStatement1, [parent.commentID]);

      parent["children"] = children;
      return parent;
    });

    const ret = await Promise.all(promises);
    
    return res.json(ret)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//editsComment
app.put('/editComment', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {commentID, content} = req.body;
  
  try {
    const [results, fields] =  await pool.promise().query('UPDATE comment SET content = ? WHERE commentID = ?', [content, commentID])
    if (results.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
  // res -> status Code
});

//Deletes Comment
app.delete('/deleteComment', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {commentID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM comment WHERE commentID = ?', [commentID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

//Upvotes Comment
app.post('/upvoteComment', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, commentID} = req.body

  

  const newVote = {
    userID: userID,
    commentID:  commentID,
    vote: 1
  };

  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM commentVote WHERE userID = ? AND commentID = ?', [userID, commentID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE commentVote SET vote = 1 WHERE userID = ? AND commentID = ?', [userID, commentID])
      return res.sendStatus(200); // Vote updated
    }
    await pool.promise().query('INSERT INTO commentVote SET ?', [newVote])
    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
});

//Downvotes Comment
app.post('/downvoteComment', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, commentID} = req.body

  

  const newVote = {
    userID: userID,
    commentID:  commentID,
    vote: -1
  };

  try {
    const [results, fields] = await pool.promise().query('SELECT * FROM commentVote WHERE userID = ? AND commentID = ?', [userID, commentID]);

    if (results.length >= 1) {
      await pool.promise().query('UPDATE commentVote SET vote = -1 WHERE userID = ? AND commentID = ?', [userID, commentID])
      return res.sendStatus(200); // Vote updated
    }
    await pool.promise().query('INSERT INTO commentVote SET ?', [newVote])
    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
});

//Removes Vote on Comment
app.delete('/removeCommentVote', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, commentID} = req.body

  try {
    const [results, fields] =  await pool.promise().query('DELETE FROM commentVote WHERE userID = ? AND commentID = ?', [userID, commentID])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
});

/////////////////////////////////////////////////////////////////////////////NON CLASS RELATED ROUTES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res) => {
  // do this things with that
  res.send("We did it")
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});