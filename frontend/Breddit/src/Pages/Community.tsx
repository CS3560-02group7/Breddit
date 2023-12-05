import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Post from '../Components/Post.tsx'

const Community = () => {
    const title = 'CPP Subbreddit'
    const [joinText, setJoinButton] = useState('Join')

    const joined = () => {
        // Toggle between 'join' and 'joined'
        setJoinButton((prevText) => (prevText === 'Join' ? 'Joined' : 'Join'));
    };

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/create_post`; 
      navigate(path);
    }

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
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>

                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>


                </li>


            </div>
        </>

    )
}

export default Community;