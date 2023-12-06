import Post from '../Components/Post.tsx'
import Comment from '../Components/Comment.tsx'
import { useState, useEffect } from 'react';
import axios from 'axios';


const CommunityPost = () => {

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
    const [postData, setPostData] = useState<post[]>();
    
    return (
        <div className='bg-slate-500 flex h-screen place-items-center flex-col content-center'>
            <Post className='ml-10' title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
            <Comment/>
        </div>
    )
}

export default CommunityPost;