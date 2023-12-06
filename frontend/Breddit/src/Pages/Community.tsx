import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Post from '../Components/Post.tsx'
import axios from 'axios';





const Community = () => {
    const location = useLocation();
    const { pathname } = location;

    // This will ensure that if a user just enters here, we can still render everything as needed
    const title: string = pathname.substring(3);
    const [joinText, setJoinButton] = useState('Join')

    // TODO: begin user join community flow
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
        flair: [string],
        reputation: number
    }

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/create_post`; 
      navigate(path);
    }

    const [postData, setPostData] = useState<post[]>();
    const [communityID, setCommunityID] = useState<number>();

    useEffect(() => {
        axios.get(`http://localhost:3000/communityID?name=${title}`)
        .then((response) => {
            setCommunityID(response.data[0].communityID)
            console.log(response.data[0].communityID)
        })
        .catch((err) => {console.error(err)})
    }, [title])

    useEffect(() => {
        const fetchPosts = async () => {
            const url: string = `http://localhost:3000/posts_in_community?communityID=${communityID}`
            console.log(url)
            axios.get(url)
            .then((response) => {
                setPostData(response.data)
            })
            .catch((err) => {console.error(err)})
        }
        fetchPosts();
    }, [communityID])


    return (
        <>
            <div className='bg-slate-500 h-[150px] flex align-center items-center text-offwhite'>
                {/* image goes right here */}
                <div className='ml-[10%] text-3xl'>{decodeURIComponent(title)}</div>
                <button onClick={joined} className='rounded-full border-solid border-2 border-white ml-5 w-[90px] py-2 text-center' >{joinText}</button>
                <button onClick={routeChange} className='rounded-full border-solid border-2 border-white ml-5 px-5 py-2 text-center' >Create Post</button>
            </div >

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-slate-300'>
            <li className='list-none ml-[10%] py-5'>
                {postData && postData.map((post, idx) => {
                    console.log(post.date, typeof post.date)
                    return <Post key={`${post.postID} -- ${idx}`} title={post.title} likes={post.reputation} userID={String(post.userID)} type={post.postType} content={post.body} postID={String(post.postID)} datePosted={post.date || new Date} tags={post.flair} />
                } )} 
                </li>


            </div>
        </>

    )
}

export default Community;