import { Select } from 'antd';
import axios from 'axios';
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

    const nav = useNavigate()
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [userCommunity, setUserCommunity] = useState([])
    const [userComments, setUserComments] = useState([])
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
            console.log(response)
            setUserData(response.data[0])
            console.log(userData)
        }).catch(function (error) {
            alert(error);
        });
    },[userID]);

    function goToEditProfile(){
        console.log("Here")
        const userID = localStorage.getItem("userID");
        nav("../editprofile/:" + userID)
    }

    if (userData){
        return(<div>
            <div className="canvas-paper">
                <div className="h-screen bg-slate-300">
            <div>
                <header className="bg-slate-500 shadow-md justify-between items-center p-5 flex">
                    <nav>
                        <a href="" className="text-2xl font-bold ml-5 text-offwhite">Breddit</a>
                    </nav>
                </header>
            </div>
            <div className="mx-auto container p-5 flex">
                <div className="w-1/3">
                    <div className="bg-offwhite shadow-md flex-col rounded p-5 flex space-y-5 relative">
                        <img src="https://i.redd.it/1b08e2gy2xo81.jpg" className="self-center w-20 h-20 rounded-full"/>
                            <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-800">Username: {userData.username}</p>
                                <div className="items-center justify-between flex">
                                    <p className="text-sm text-gray-600">
                                        Reputation: {userData.reputation}
                                        <span className="text-sm text-gray-500">0</span>
                                    </p>
                                </div>
                            </div>
                                <button type="submit" className="hover:bg-amber-500 rounded text-white bg-amber-400 font-bold
                                    py-2 px-4" onClick={goToEditProfile} >Edit Profile</button>
                                    <div className="absolute right-0 top-5"></div>
                                </div>
                            </div>
                            <div className="w-2/3 pl-5 grid grid-cols-1 gap-5">
                                <section className="bg-offwhite shadow-md rounded p-5">
                                <div className="justify-between items-center flex">
                                    <p className="text-xl font-bold text-gray-800">Posts</p>
                                    <button type="submit" className="hover:bg-green-700 rounded text-white bg-green-500
                                        font-bold py-1 px-2">
                                        <div className="fas fa-plus">+</div>
                                    </button>
                                    </div>
                                </section>
                                <section className="bg-offwhite shadow-md rounded p-5">
                                <div className="justify-between items-center flex">
                                    <p className="text-xl font-bold text-gray-800">Communities</p>
                                    <button className="hover:bg-green-700 rounded text-white bg-green-500
                                        font-bold py-1 px-2">
                                    <div className="fas fa-plus"> + </div>
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