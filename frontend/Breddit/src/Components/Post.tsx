// TODO: Figure out how we can make a type that will only accept aws s3 bucket urls for all the image source
// types

// ensures that posts can only be one of these three types
type postType = "image" | "post" | "link";

export interface postProps {
    title: string,
    likes: number,
    dislikes: number,
    userID: string,
    datePosted: string,
    // We are only allowing one image per post, so that we can only us a string :)
    content: string,
    type: postType,
    postID: string,
    tags: [string]
}


const Post = (props: postProps) => {
    const d = new Date();
    const today = d.toLocaleDateString()

    // const reputation = likes - dislikes;
    const userName = localStorage.getItem("username");
    console.log(props.type)
    return (
        <div className="bg-offwhite w-5/6 h-fit p-5 m-3 rounded border-solid border-2 border-slate-gray">
            <div className='flex align-middle items-center'>
                <div className='text-2xl pb-3'>{props.title}</div>
            </div>
            <div className="flex">
                <div>Posted by: {userName} </div>
                <div className='ml-1'>on {typeof props.datePosted === 'object' ? today : props.datePosted }</div>
            </div>
            <div className=''>{props.likes - props.dislikes} likes</div>
            {
            props.type === "post" ? <div className='py-3'>{props.content}</div> : 
            props.type === "image" ? <img src={props.content} /> :
            props.type === "link" ? 
            <div className="py-3">
                <a href={props.content}>
                    {props.title}
                </a>
            </div> : 
            <></>
            }
            
            <div className=''>{props.tags}</div>
            </div>
    )
}

export default Post;