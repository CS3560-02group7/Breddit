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



const Comment = () => {
    return (
        <div className="mx-auto items-start justify-start flex-col container flex bg-offwhite rounded p-4">
    <div className="w-full pt-0 p-4">
      <p className="font-extrabold text-3xl mb-3">Comments</p>
      <div className="items-stretch w-full pt-4 flex-row flex border-t border-gray-200">
        <div className="items-center justify-center flex-col flex">
          <button type="submit" className="hover:bg-blue-700 rounded text-white bg-blue-500 font-bold py-2
              px-8 w-full">Upvote</button>
          <p className="text-center text-sm font-semibold m-4">0</p>
          <button type="submit" className="hover:bg-red-700 rounded text-white bg-red-500 font-bold py-2
              px-8 w-full">Downvote</button>
        </div>
        <div className="ml-4">
          <p className="text-xl font-bold">Username</p>
          <p className="text-lg mt-1 text-gray-700">Comment text goes here. This is just a placeholder.&nbsp;</p>
          <button type="submit" className="hover:bg-green-700 rounded text-white bg-green-500 font-bold
              py-2 px-4 w-auto mt-4">Reply</button>
        </div>
      </div>
    </div>
    <div className="w-full p-4">
      <label className="font-semibold text-gray-700">Enter Comment:</label>
      <textarea placeholder="Type your comment here.." className="w-full mt-2 rounded-md p-2 border
          border-gray-300"></textarea>
      <button type="submit" className="text-white mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-md">Post
          Comment</button>
      <button className="bg-red-500 hover:bg-red-700 text-white h-12 rounded-md shadow-md pr-6 pl-6 text-center
          ml-2">Cancel</button>
    </div>
  </div>
    );
  };

export default Comment;