// TODO: Figure out how we can make a type that will only accept aws s3 bucket urls for all the image source
// types

// ensures that posts can only be one of these three types
type postType = "image" | "post" | "link";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface postProps {
    title: string,
    likes: number,
    userID: string,
    datePosted: string,
    // We are only allowing one image per post, so that we can only us a string :)
    content: string,
    type: postType,
    postID: number,
    tags: [string],
    username: string
    reputation: number
}


const Post = (props: postProps) => {
    const d = new Date();
    const today = d.toLocaleDateString()

    const nav = useNavigate();


    function upvotePost(postID: number) {
        const payload = {
            postID: postID,
            userID: localStorage.getItem("userID")
        }
        axios.post("http://localhost:3000/upvotePost", payload) 
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function downvotePost(postID: number) {
        const payload = {
            postID: postID,
            userID: localStorage.getItem("userID")
        }
        axios.post("http://localhost:3000/downvotePost", payload) 
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }



    return (
        <div className="bg-offwhite w-5/6 h-fit p-5 m-3 rounded border-solid border-2 border-slate-gray" >
            <div onClick={() => {nav(`/post/${props.postID}`)}}>
            <div className='flex align-middle items-center'>
                <div className='text-2xl pb-3'>{props.title}</div>
            </div>
            <div className="flex">
                <div>Posted by: {props.username} </div>
                <div className='ml-1'>on {typeof props.datePosted === 'object' ? today : props.datePosted }</div>
            </div>
            <div className=''>{props.reputation || props.likes} likes</div>
            {props.type === "post" ? <div className='py-3'>{props.content}</div> : 
            props.type === "image" ? <img src={props.content} /> : <></>}
            </div>
            <button className="hover:bg-blue-700 rounded text-white bg-blue-500 font-bold
                py-2 px-8 w-32 " onClick={() => {upvotePost(props.postID)}}>Upvote</button>
            <p className="text-center text-sm font-semibold m-4">{}</p>
            <button type="submit" className="hover:bg-red-700 rounded text-white bg-red-500 font-bold py-2
                px-8 w-32" onClick={() => {downvotePost(props.postID)}} >Downvote</button>
            
            <div className=''>{props.tags}</div>
        </div>
    )
}

export default Post;