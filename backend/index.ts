require('dotenv').config()
import express from "express";
import { userInfo } from "os";
const app = express();
const port = 3000;

interface Account {
  emailAddress: string,
  username: string,
  password: string,
  profilePicture: string,
  reputation: number
}

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


//////////////////////////////////////////////////////////////////////////////////////USER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Creates A User Object
app.post('/user', (req, res) => {
  const {mail, password, username, profilePicture,} = req.body;
  // res -> status code
});

//Returns user data
//USER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res) => {
  // Insert a value into account, then we query it to see if we did good
  var newUser: Account = {
    emailAddress: "chirayurai@gmail.com",
    username: "chirayu",
    password: "password123",
    profilePicture: "https://google.com",
    reputation: 1
  }

  // This will insert items into the db, will work on extracting types and all that
  pool.query('INSERT INTO account SET ?', newUser, (error, results, fields) => {
    if (error) {
        // Handle error after the release.
        console.error('An error occurred: ', error);
    }

    // Use the results here
    console.log('Inserted Row ID:', results.insertId);
  });

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
  const {userID} = req.query; 
  //res -> json object
});

//Adds a community to the list of communities users are in
app.put('/subscribeToCommunity', (req, res) => {
  const {userID, communityID} = req.body
  // res -> status code
});

//Changes the profile picture of the user once profile has already been created
app.put('/changeProfilePic', (req, res) => {
  // do this things with that
  const {userID, photoURL} = req.body
  // res -> status code
});

//Deletes User
app.delete('/user', (req, res) => {
  const {userID} = req.body
  // res -> status code
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
  const {userID, title, type, body, tags} = req.body;
  // res -> status code
});

//Gets Post Data
app.get('/post', (req, res) => {
  const {userID, postID} = req.query;
  // res -> JSON object
});

//Edit Body Of Post
app.put('/post', (req, res) => {
  const {userID, postID, edit,tags} = req.query;
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
  const {userID, description, postID} = req.body;
  // res -> status code
});

//Creates A Comment (as reply)
app.post('/commentReply', (req, res) => {
  const {userID, description, parentID} = req.body;
  // res -> status code
});

//Gets Comment
app.get('/comment', (req, res) => {
  const {userID, commentID} = req.query;
  // res -> JSON object
});

//editsComment
app.put('/editComment', (req, res) => {
  const {userID, commentID} = req.query;
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