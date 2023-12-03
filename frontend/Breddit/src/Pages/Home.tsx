import Post from '../Components/Post.tsx'

const Home = () => {
    return (
        <>
        <Post title={'poop'} likes={99} dislikes={10} userID={'123'} type={'image'} content={'hey I go to CPP'} postID={'21'} datePosted={new Date()} tags={['tags']}/>
        </>
    )
}

export default Home;