import Post from '../Components/Post.tsx'
import Comment from '../Components/Comment.tsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type postType = "post" | "image" | "link";


const CommunityPost = () => {
    // Returns the post id up in the URL
    const { id } = useParams();
    const [showReply, setShowReply] = useState<boolean>();

    interface post {
        postID: number, 
        title: string,
        postType: postType,
        body: string,
        date: Date,
        communityID: number,
        userID: number,
        flair: [string],
        reputation: number,
    }

    interface comment {
        commentID: number,
        content: string,
        communityID: number,
        userID: number,
        postID: number,
        parentID: number,
        datePosted: Date,
        reputation: number,
        children: comment[]
        username: string
    }

    /* 
   {"commentID":16,"content":"testing","communityID":1,"userID":20,"postID":55,"parentID":null,"datePosted":null,"reputation":"0","children":[{"commentID":17,"content":"reply testing","communityID":1,"userID":13,"postID":55,"parentID":16,"datePosted":null,"reputation":"0"},{"commentID":18,"content":"reply testing again","communityID":1,"userID":13,"postID":55,"parentID":16,"datePosted":null,"reputation":"0"}]},{"commentID":19,"content":"oh boy","communityID":1,"userID":20,"postID":55,"parentID":null,"datePosted":null,"reputation":"0","children":[{"commentID":20,"content":"so easy","communityID":1,"userID":13,"postID":55,"parentID":19,"datePosted":null,"reputation":"0"},{"commentID":21,"content":"too easy","communityID":1,"userID":13,"postID":55,"parentID":19,"datePosted":null,"reputation":"0"}]}] 
    
    */
    const [postData, setPostData] = useState<post>();
    const [commentData, setCommentData] = useState<comment[]>();
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const curr_user_id = Number(localStorage.getItem("userID"))
    // With post ID, I can fetch both comment and post data

    useEffect(() => {
        axios.get(`http://localhost:3000/post?postID=${id}`)
        .then((response) => {
            setPostData(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/children?postID=${id}`)
        .then((response) => {
            setCommentData(response.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [fetchAgain])

    const WriteParentComment = () => {
        const [text, setText] = useState<string>();
        const handlePostParentComment = () => {
           const payload = {
            userID: localStorage.getItem("userID"),
            content: text,
            postID: id,
            date: new Date
           } 

           axios.post("http://localhost:3000/comment", payload)
           .then((response) => {
            console.log(response.data)
            setFetchAgain(!fetchAgain)
           })
           .catch((err) => {
            console.error(err)
           })

        }

        return (
            <div className="w-full p-4">
                <label className="font-semibold text-gray-700">Enter Comment:</label>
                <textarea placeholder="Type your comment here.." className="w-full mt-2 rounded-md p-2 border
                    border-gray-300" onChange={(e) => {setText(e.target.value)}}></textarea>
                <button  className="hover:bg-blue-700 text-white mt-2 px-6 py-3 bg-blue-500
                    rounded-md" onClick={handlePostParentComment}>Post Comment</button>
                <button type="submit" className="hover:bg-red-700 text-white bg-red-500 h-12 rounded-md shadow-md
                    pr-6 pl-6 text-center ml-2">Cancel</button>
            </div>
        )
    }


    function upvoteComment(commentID: number, userID: number) {
        const payload = {
            commentID: commentID,
            userID: userID
        }
        axios.post("http://localhost:3000/upvoteComment", payload) 
        .then((response) => {
            console.log(response.data)
            setFetchAgain(!fetchAgain)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function downvoteComment(commentID: number, userID: number) {
        const payload = {
            commentID: commentID,
            userID: userID
        }
        axios.post("http://localhost:3000/downvoteComment", payload) 
        .then((response) => {
            console.log(response.data)
            setFetchAgain(!fetchAgain)
        })
        .catch((err) => {
            console.error(err)
        })
    }


    const ParentComment = (props: comment) => {
        const {content, userID, reputation, commentID, username } = props;
        const [replyText, setReplyText] = useState<string>("");


        // const {userID, content, parentID, date} = req.body;
        function handlePostReply(userID: number, content: string, parentID: number){
            const payload = {
                userID: userID,
                content: content,
                parentID: parentID,
                date: new Date
            }
            axios.post("http://localhost:3000/commentReply", payload)
            .then((response) => {
                setFetchAgain(!fetchAgain)
            })

        }
        return <div className="bg-gray-200 rounded-md items-stretch w-5/6 p-2 border-0 border-black flex-row flex h-auto">
            <div className="items-center justify-center flex-col flex">
            <button className="hover:bg-blue-700 rounded text-white bg-blue-500 font-bold
                py-2 px-8 w-full" onClick={() => {upvoteComment(commentID, curr_user_id )}}>Upvote</button>
            <p className="text-center text-sm font-semibold m-4">{reputation}</p>
            <button type="submit" className="hover:bg-red-700 rounded text-white bg-red-500 font-bold py-2
                px-8 w-full" onClick={() => {downvoteComment(commentID, curr_user_id)}} >Downvote</button>
            </div>
            <div className="ml-4">
            <p className="text-xl font-bold">{username}</p>
            <p className="text-lg mt-1 text-gray-700">{content}</p>
            <button type="button" className="hover:bg-green-700 rounded text-white bg-green-500 font-bold
                py-2 px-4 w-auto mt-4" onClick={() => {setShowReply(!showReply)}}>Reply</button>
            <div className={`mt-4 ${showReply ? "" : "hidden"}`}>
                <textarea placeholder="Type your reply here..." className="w-full mt-2 rounded-md textarea p-2
                    border border-gray-300" onChange={(e) => {setReplyText(e.target.value)}}></textarea>
                <button  className="hover:bg-blue-700 text-white mt-2 px-6 py-3 bg-blue-500
                    rounded-md"  onClick={() => {handlePostReply(curr_user_id, replyText, commentID)}}>Post Reply</button>
                <button type="button" className="hover:bg-red-700 text-white bg-red-500 h-12 rounded-md
                    shadow-md pr-6 pl-6 text-center ml-2" onClick={() => {setShowReply(!showReply)}}>Cancel</button>
            </div>
            </div>
        </div>
    }

    const ChildComment = (props: comment) => {
        const {content, userID, reputation, commentID, username} = props;
      return <div className="bg-gray-300 rounded-md items-stretch w-5/6 p-2 border-0 border-black flex-row flex h-auto ml-16">
        <div className="items-center justify-center flex-col flex">
          <button type="submit" className="hover:bg-blue-700 rounded text-white bg-blue-500 font-bold
              py-2 px-8 w-full" onClick={() => {upvoteComment(commentID, curr_user_id)}}>Upvote</button>
          <p className="text-center text-sm font-semibold m-4">{reputation}</p>
          <button type="submit" className="hover:bg-red-700 rounded text-white bg-red-500 font-bold py-2
              px-8 w-full" onClick={() => {downvoteComment(commentID, curr_user_id)}}>Downvote</button>
        </div>
        <div className="ml-4">
          <p className="text-xl font-bold">{username}</p>
          <p className="text-lg mt-1 text-gray-700">{content}</p>
        </div>
      </div>
    }

    // {"postID":55,"title":"Fortnite's downfall","postType":"post","body":"Back in 2018, Fortnite was absolutely on fire. The game had this unique vibe – the OG map, the crazy events, and the 
    // sheer excitement of it all. It was like everyone was part of this massive gaming community. The simplicity and pure fun back then? Unbeatable. Miss those days, man. #FortniteNostalgia 
    // 🕹️🔥","date":"2023-12-06T11:30:02.000Z","communityID":1,"userID":32,"flair":"serious","reputation":"0"}
    
    return (
        <div>
            {postData && <Post className='ml-10' title={postData.title} reputation={postData.reputation} userID={postData.userID} type={postData.postType} content={postData.body} postID={postData.postID} datePosted={postData.date} tags={postData.flair}/>}
            < WriteParentComment />
            <div className='bg-gray-500 flex h-full place-items-center flex-col content-center'>
                <div className="mx-auto items-start justify-start flex-col container flex">
                    <div className="w-full pt-0 p-4">
                        <p className="font-extrabold text-3xl mb-3">Comments</p>
                        <div className="flex flex-col space-y-7">
                            {commentData && commentData.map((parentComment, parentIdx) => {
                                return <div className='flex flex-col space-y-3'>
                                    <ParentComment key={`${parentIdx}`} userID={parentComment.userID} content={parentComment.content} reputation={parentComment.reputation} commentID={parentComment.commentID} username={parentComment.username} />
                                    {parentComment.children.map((comment, childIdx) => {
                                        return <ChildComment key={childIdx} userID={comment.userID} content={comment.content} reputation={comment.reputation} commentID={comment.commentID} username={comment.username}/>
                                    })}
                                    </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPost;