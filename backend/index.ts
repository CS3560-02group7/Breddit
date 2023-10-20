import express from "express";
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

app.get('/', (req, res) => {
  // do this things with that
  res.send("We did it")
});

app.get('/home/:index', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const ind = req.params.index;
  res.json({
    0: ["25 post objects"]
  })
});

// route to show the posts in a community based on some offset
app.get('/comm/:community/:index', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const community = req.params.community;
  const ind = req.params.index;
  res.json({
    0: ["25 post objects"]
  })
});

// Returns user data (including communities they're subbed to)
app.get('user/:userID', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const id = req.params.userID; 
  res.json({
    0: ["25 post objects"]
  })
});

// returns users communities
app.get('user/:userID/communities', (req, res) => {
  // this will determine the offset of how many posts to give the user
  // we are NOT making it unique to each user, it's ok.
  const id = req.params.userID; 
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