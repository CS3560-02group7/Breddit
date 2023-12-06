import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Post from '../Components/Post.tsx'
import axios from 'axios';





const Community = () => {
    const location = useLocation();
    const { pathname } = location;
    const userID = localStorage.getItem("userID");

    // This will ensure that if a user just enters here, we can still render everything as needed
    const title: string = pathname.substring(3);
    const [joinText, setJoinButton] = useState('Join')

    // TODO: begin user join community flow


    interface post {
        postID: number, 
        title: string,
        postType: string,
        body: string,
        date: Date,
        communityID: number,
        userID: number,
        flair: [string],
        reputation: number,
        username: string,
        name: string
    }

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/create_post`; 
      navigate(path);
    }

    const [postData, setPostData] = useState<post[]>();
    const [communityID, setCommunityID] = useState<number>();
    const [communityData, setCommunityData] = useState([])

    const joined = () => {
        // Toggle between 'join' and 'joined
        const userID = localStorage.getItem("userID");
        axios.get('http://localhost:3000/checkRole?userID='+userID+'&communityID='+communityID)
        .then((response) => {
            if (response.data =="None"){
                axios.post("http://localhost:3000/subscribeToCommunity",{userID: userID, communityID: communityID})
                .then((response) => {
                    setJoinButton("Joined")
                })
            }
            else if (response.data =="member"){
                axios.delete("http://localhost:3000/unsubscribeToCommunity",{ data: {userID: userID, communityID: communityID} })
                .then((response) => {
                    setJoinButton("join")
                })
            }
            else if (response.data="owner"){
                axios.delete("http://localhost:3000/deleteCommunity",{ data: {communityID: communityID} })
                .then((response) => {
                    navigate("/");
                })
            }
                })
        .catch((err) => {console.error(err)})
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/communityID?name=${title}`)
        .then((response) => {
            setCommunityID(response.data[0].communityID)
        })
        .catch((err) => {console.error(err)})
    }, [title])

    useEffect(() => {
        const fetchPosts = async () => {
            const url: string = `http://localhost:3000/posts_in_community?communityID=${communityID}`
            axios.get(url)
            .then((response) => {
                console.log("SHOWING POSTS", response.data)
                setPostData(response.data)
            })
            .catch((err) => {
                console.error(err)
                setPostData([])
            })
        }
        fetchPosts();
    }, [communityID])

    useEffect(() => {
        axios.get('http://localhost:3000/checkRole?userID='+userID+'&communityID='+communityID)
        .then((response) => {
            if (response.data == "None"){
                setJoinButton("Join")
            }
            else if (response.data == "member"){
                setJoinButton("Joined")
            }
            else if (response.data == "owner"){
                setJoinButton("Delete Community")
            }
        });
    }, [communityID])

    useEffect(() => {
        axios.get('http://localhost:3000/community?communityID='+communityID)
        .then((response) => {
            setCommunityData(response.data[0]);
        });
    }, [communityID])

    return (
        <>
            <div className='bg-slate-500 h-[150px] flex align-center items-center text-offwhite'>
                {/* image goes right here */}
                <div className='ml-[10%] text-3xl'>{decodeURIComponent(title)}</div>
                <button onClick={joined} className='rounded-full border-solid border-2 border-white ml-5 w-[90px] py-2 text-center' >{joinText}</button>
                <button onClick={routeChange} className='rounded-full border-solid border-2 border-white ml-5 px-5 py-2 text-center' >Create Post</button>
            </div >
            <div className ='bg-slate-500 flex  items-center text-offwhite'>
                <div className ="ml-[10%] mt-[-2%]">{communityData.description}</div>
                </div>

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-slate-300'>
            <li className='list-none ml-[10%] py-5'>
                {postData && postData.map((post, idx) => {
                    return <Post key={`${post.postID} -- ${idx}`} title={post.title} likes={post.reputation} name={post.name} userID={String(post.userID)} type={post.postType} content={post.body} postID={String(post.postID)} datePosted={post.date || new Date} tags={post.flair} username={post.username}/>
                } )} 
                </li>


            </div>
        </>

    )
}

export default Community;