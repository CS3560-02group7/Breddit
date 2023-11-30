import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
            <div className='bg-slate-400 h-[150px]'></div>
            <div className='bg-amber-600 h-[150px] flex align-center items-center'>
                <div className='ml-[10%] text-3xl'>{title}</div>
                <button onClick={joined} className='rounded-full border-solid border-2 border-white ml-5 w-[90px] py-2 text-center' >{joinText}</button>
                <button onClick={routeChange} className='rounded-full border-solid border-2 border-white ml-5 px-5 py-2 text-center' >Create Post</button>
            </div >

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-amber-400'>
                <li className='list-none ml-[10%] py-5'>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                    <ul>'post'</ul>
                </li>


            </div>
        </>

    )
}

export default Community;