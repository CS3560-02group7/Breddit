import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Post from '../Components/Post.tsx'
import axios from 'axios';

const Community = () => {
    const title = 'CPP Subbreddit'
    const [joinText, setJoinButton] = useState('Join')

    const joined = () => {
        // Toggle between 'join' and 'joined'
        setJoinButton((prevText) => (prevText === 'Join' ? 'Joined' : 'Join'));
    };

    interface post {
        postID: number, 
        title: string,
        postType: string,
        body: string,
        date: Date,
        communityID: number,
        userID: number,
        flair: [string]
    }

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/create_post`; 
      navigate(path);
    }

    const [postData, setPostData] = useState<post[]>();

    useEffect(() => {
        const fetchPosts = async () => {
            axios.get("http://localhost:3000/posts_in_community?communityID=6")
            .then((response) => {
                setPostData(response.data)
            })
        }
        fetchPosts();
    }, [])

    return (
        <>
            <div className='bg-slate-500 h-[150px] flex align-center items-center text-offwhite'>
                {/* image goes right here */}
                <div className='ml-[10%] text-3xl'>{title}</div>
                <button onClick={joined} className='rounded-full border-solid border-2 border-white ml-5 w-[90px] py-2 text-center' >{joinText}</button>
                <button onClick={routeChange} className='rounded-full border-solid border-2 border-white ml-5 px-5 py-2 text-center' >Create Post</button>
            </div >

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-slate-300'>
            <li className='list-none ml-[10%] py-5'>
                {postData && postData.map((post, idx) => {
                    return <Post key={`${post.postID} -- ${idx}`} title={post.title} likes={99} dislikes={10} userID={String(post.userID)} type={post.postType} content={post.body} postID={String(post.postID)} datePosted={post.date || new Date} tags={post.flair} />
                } )} 
                </li>


            </div>
        </>

    )
}

export default Community;