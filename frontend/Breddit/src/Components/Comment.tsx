export interface Node {
    value: string,
    children?: [Node]
}

export interface CommentProps {
    data: string,
    // will have to do some image url validation to make sure this is good
    // Images will be uploaded to an S3 bucket, and when we do that we get back the url, append that to database as 
    // image url thing (that's why it's a string)
    imageSource: string,
    userID: string,
    postID: string,
    directParent: Node,
    rootParent: Node,
    likes: number,
    dislikes: number,
}


const Comment = (props: CommentProps) => {
    // const reputation = likes - dislikes;
    return (
        <>
        Comment
        </>
    )
}

export default Comment;