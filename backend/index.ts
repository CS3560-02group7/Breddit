require('dotenv').config()
const pool = require('./db/db.ts'); // Import the pool
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

import express from "express";
import { Account, Comment, Post, UserCommunityRole, Community } from "./db/db_types";


const app = express();
app.use(jsonParser)
const port = 3000;

//USER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Creates A User Object
app.post('/user', (req, res) => {
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {emailAddress, password, username, profilePicture} = req.body;
  
  const newUser: Account = {
    emailAddress: emailAddress,
    username: username,
    password: password,
    profilePicture: profilePicture,
    reputation: 0
  }

  pool.query('INSERT INTO account SET ?', newUser, (error, results, fields) => {
    if (error) {
        console.error('An error occurred: ', error);
        return res.status(500).send('An error has occured within the server')
    }
    res.send(201).send('Sucessfully added new user!')
  });
});


// add one to user reputation
app.put('/decrement_user_rep', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID} = req.body

  pool.query(`UPDATE account SET reputation=reputation - 1 WHERE userID="${userID}"`, (err, user) => {
    if (err) {
        console.log(err)
        res.status(500).send('Server Error, could not do the thing');
    } else {
        res.json(user);
    }
  });
})


// subtract one to user reputation
app.put('/increment_user_rep', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID} = req.body

  pool.query(`UPDATE account SET reputation = reputation + 1 WHERE userID = "${userID}"`, (err, user) => {
    if (err) {
        res.status(500).send('Server Error');
    } else {
        res.json(user);
    }
  });
})

// Returns user data (including communities they're subbed to)

// TODO: Add the communities users are subbed to
app.get('/user', (req, res) => {
  const {userID} = req.query; 
  //res -> json object
  pool.query(`SELECT * FROM account WHERE userID="${userID}"`, (err, user) => {
    if (err) {
        res.status(500).send('Server Error');
    } else {
        res.json(user);
    }
  });
});

//Adds a community to the list of communities users are in
app.post('/subscribeToCommunity', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID, communityID} = req.body;
  
  const subToComm:UserCommunityRole = {
    roleInCommunity: "member",
    userID: userID,
    communityID: communityID,
  }

  pool.query('INSERT INTO userCommunityRole SET ?', subToComm, (error, results, fields) => {
    if (error) {
        console.error('An error occurred: ', error);
        return res.status(500).send('An error has occured within the server')
    }
    res.send(201).send('Sucessfully subscribed user to community!')
  });
});

//Changes the profile picture of the user once profile has already been created
app.put('/changeProfilePic', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }
  const {userID, photoURL} = req.body

  // First we need to validate the req.query ngl
  pool.query(`UPDATE account SET profilePicture = "${photoURL}" WHERE userID=${userID}`, (error, results, fields) => {
    if (error) {
        console.error('An error occurred: ', error);
        return res.status(500).send('An error has occured within the server')
    }
    res.send(201).send('Successfully changed user profile picture :D')
  });
  
});

//Deletes User
app.delete('/user', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Bad Request: Missing or incorrect Content-Type');
  }

  const {userID} = req.body
  
  pool.query(`DELETE FROM accounts WHERE userID=${userID}`, (error, results, fields) => {
    if (error) {
        console.error('An error occurred: ', error);
        return res.status(500).send('An error has occured within the server')
    }
    res.send(200).send('Successfully deleted user!')
  });

});

//////////////////////////////////////////////////////////////////////////////////////COMMUNITY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Create A Community Object
app.post('/community', (req, res) => {
  const {userID, communityName, description, picture} = req.body;
  // res -> status code
});

//Gets the all the data from a community from the database
app.get('/community', (req, res) => {
  const {communityID} = req.query; 
  // res -> json object
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