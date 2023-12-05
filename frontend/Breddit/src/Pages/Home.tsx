import Post from '../Components/Post.tsx'
import Comment from '../Components/Comment.tsx'

const Home = () => {
    return (
        <>
            <div className='bg-slate-500 h-[150px] flex align-center items-center flex-col'>
                <div className='text-3xl mt-5 text-offwhite'>Home Page</div>
                <div className='text-offwhite'>Welcome to Breddit, where you can share and connect with people all around the world</div>
            </div>
            

            {/* where the posts are gonna go */}
            <div className='w-full h-max bg-slate-300'>
                <li className='list-none ml-[10%] py-5'>
                <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
                <Comment/>
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

export default Home;