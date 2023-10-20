


// TODO: Figure out how we can make a type that will only accept aws s3 bucket urls for all the image source
// types

// ensures that posts can only be one of these three types
type postType = "image" | "text" | "link";

export interface postProps {
    title: string,
    likes: number,
    dislikes: number,
    userID: string,
    datePosted: Date,
    // We are only allowing one image per post, so that we can only us a string :)
    content: string,
    type: postType,
    postID: string,
    tags: [string]
}


const Post = (props: postProps) => {
    const today = new Date();
    // const reputation = likes - dislikes;
    return (
        <>
        post
        </>
    )
}

export default Post;