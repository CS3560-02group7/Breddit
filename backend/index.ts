require('dotenv').config()
import express from "express";
const pool = require('./db/db.ts'); // Import the pool
import { Account, Comment, Post, UserCommunityRole, Community } from "./db/db_types";
const app = express();
const port = 3000;

/*
The whole point of this API is to let the frontend interact with the database, without having to do TOO much work
Also making sure that only authorized users can do things with the data

Routes --> what combination of http method + url do we need to achieve the functionality that we want
routes would all go here
--> db connection and all taht goes out
--> auth stuff goes out

Get --> read
Post --> create
patch/put --> update
delete --> delete
*/


//USER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res) => {
  // Insert a value into account, then we query it to see if we did good
  // var newUser: Account = {
  //   emailAddress: "chirayurai@gmail.com",
  //   username: "chirayu",
  //   password: "password123",
  //   profilePicture: "https://google.com",
  //   reputation: 1
  // }

  // This will insert items into the db, will work on extracting types and all that
  // pool.query('INSERT INTO account SET ?', newUser, (error, results, fields) => {
  //   if (error) {
  //       // Handle error after the release.
  //       console.error('An error occurred: ', error);
  //   }

  //   // Use the results here
  //   console.log('Inserted Row ID:', results.insertId);
  // });

  // How ot query every single item from db
  pool.query('SELECT * FROM account', (err, accounts) => {
    if (err) {
        // Handle error
        res.status(500).send('Server Error');
    } else {
        res.json(accounts);
    }
});

})

// Returns user data (including communities they're subbed to)
app.get('/user', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const {userID} = req.query; 
  res.json({
    0: ["25 post objects"]
  })
});

//Adds a community to the list of communities users are in
app.put('/subscribeToCommunity', (req, res) => {
  // do this things with that
  const {userID, communityID} = req.body
  // res -> status code
});

app.put('/changeProfilePic', (req, res) => {
  // do this things with that
  const {userID, photoURL} = req.body
  // res -> status code
});

app.get('/', (req, res) => {
  // do this things with that
  res.send("We did it")
});

app.get('/home', (req, res) => {
  // do this things with that
  res.send("We did it")
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
app.get('/comm', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.

  // const community = req.params.community;
  // const ind = req.params.index;
  res.json({
    0: ["25 post objects"]
  })
});

// returns users communities
app.get('user/:userID/communities', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.

  // const id = req.params.userID; 
  res.json({
    0: ["25 post objects"]
  })
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

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});