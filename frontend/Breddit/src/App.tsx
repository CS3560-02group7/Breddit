import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Community from './Pages/Community';
import NotFound from './Pages/NotFound';
import CreatePost from "./Pages/CreatePost";
import UserProfile from "./Pages/UserProfile";
import CreateCommunity from "./Pages/CreateCommunity";
import Comment from "./Components/Comment";
import CommunityPost from "./Pages/CommunityPost.tsx";
import EditProfile from "./Components/EditProfile";

/*
Componenets 

    


Pages
  Home page
    NO banner, posts from diff communities (maybe like top post of each community? and when you run out, just 
      go for the second top, then third, so on and so forth)
  Community page
    Banner, community title, subscribe button, num subscribers, posts, 
  Sign up page
      Form with email(unique), password, username(unique) --> could use Auth0
  Login page
      Same as sign up, but only enter either username 
  Chat page(?)
      View all DMs on side, text in middle --> messenger clone
*/

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              
              <Route index element={<Home />} />
              <Route path="chat" element={<Chat />} />
              <Route
                path="/c/:community"
                element={<Community />}
              />
              <Route
                path="CommunityPost"
                element={<CommunityPost />}
              />
              <Route path="create_post" element={<CreatePost />} />
              <Route path="profile/:user" element={<UserProfile />} />
              <Route path="create_community" element={<CreateCommunity />} />
              <Route path="post/:id" element={<CommunityPost />} />
              <Route path="editprofile/:user" element={<EditProfile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;
