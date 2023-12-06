import { Select } from 'antd';
import axios from 'axios';
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

    const nav = useNavigate()
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [postsDiv, setPostsDiv] = useState([])
    const [userCommunity, setUserCommunity] = useState([])
    const userID = localStorage.getItem("userID");
    useEffect(() => {
        axios.get("http://localhost:3000/user?userID=" + userID)
        .then((response) => {
            setUserData(response.data[0])
        }).catch(function (error) {
            alert(error);
        });
        axios.get("http://localhost:3000/userPosts?userID=" + userID)
        .then((response) => {
            setUserPosts(response.data)
            console.log(userPosts)
        }).catch(function (error) {
            alert(error);
        });
    },[]);

    function goToEditProfile(){
        const userID = localStorage.getItem("userID");
        nav("../editprofile/:" + userID)
    }

    function goToCreateCommunity(){
        nav("../create_community")
    }

    function goToCreatePost(){
        nav("../create_post")
    }

    if (userData){
        return(<div className="bg-gray-100">
            <div className="canvas-paper ">
              <div className="h-screen bg-gray-100">
                <div>
                  <header className="bg-amber-500 shadow-md justify-between items-center p-5 flex">
                  </header>
                </div>
                <div className="mx-auto items-center flex-col bg-gray-700 h-full p-5 flex">
                  <div className="bg-white shadow-md w-1/3 h-auto flex-col rounded flex space-y-5 p-5 relative">
                    <img src="https://i.redd.it/1b08e2gy2xo81.jpg" className="self-center w-20 h-20 rounded-full"/>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-center text-gray-800">Username: {userData.username}</p>
                      <p className="text-center text-gray-500">Reputation: {userData.reputation}</p>
                    </div>
                    <div className="absolute right-0 top-5"></div>
                  </div>
                  <div className="w-full mt-5 flex-row flex space-x-5">
                    <section className="bg-white shadow-md w-2/3 rounded p-5">
                      <div className="justify-between items-center flex">
                        <p className="text-xl font-bold text-gray-800">Posts</p>
                        <button type="submit" className="hover:bg-green-700 rounded text-white bg-green-500
                            font-bold py-1 px-2" onClick={goToCreatePost}>
                          <div className="fas fa-plus">+</div>
                        </button>
                      </div>
                    </section>
                    <section className="bg-white shadow-md w-1/2 rounded p-5">
                      <div className="justify-between items-center flex">
                        <p className="text-xl font-bold text-gray-800">Communities</p>
                        <button type="submit" className="hover:bg-green-700 rounded text-white bg-green-500
                            font-bold py-1 px-2" onClick={goToCreateCommunity}>
                          <div className="fas fa-plus">+</div>
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        
    }
    else{
        return(<></>)
    }
        
    }; 

export default UserProfile;