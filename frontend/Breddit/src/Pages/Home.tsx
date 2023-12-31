import Post from '../Components/Post.tsx'
import Comment from '../Components/Comment.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
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

    const [postData, setPostData] = useState<post[]>();

    useEffect(() => {
        const fetchPosts = async () => {
            axios.get("http://localhost:3000/home")
            .then((response) => {
                console.log("FETCH HOME", response.data)
                setPostData(response.data)
            })
        }
        fetchPosts();
    }, [])

    // TODO: Add handling for post types

    return (
        <>
            <div className='bg-slate-500 h-[150px] flex align-center items-center flex-col'>
                <div className='text-3xl mt-5 text-offwhite'>Home Page</div>
                <div className='text-offwhite'>Welcome to Breddit, where you can share and connect with people all around the world</div>
            </div>
            

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-slate-300'>
                <li className='list-none ml-[10%] py-5'>
                {postData && postData.map((post, idx) => {
                    return <Post key={`${post.postID} -- ${idx}`} title={post.title} name={post.name} likes={post.reputation} userID={String(post.userID)} type={post.postType} content={post.body} postID={String(post.postID)} datePosted={post.date || new Date} tags={post.flair} username={post.username}/>
                } )} 
                </li>


            </div>
            </>
    )
}

export default Home;