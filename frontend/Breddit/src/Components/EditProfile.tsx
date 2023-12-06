
const EditProfile = () => {
    return (
        <div className="h-screen justify-center items-center flex">
    <form className="bg-white shadow-md mb-4 w-1/3 p-4 rounded">
      <p className="text-2xl font-bold text-gray-700 mb-4 text-center">Edit Your Profile</p>
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2 block">Username</label>
        <input type="text" placeholder="Your Username" className="shadow appearance-none border rounded focus:outline-none
            focus:shadow-outline w-full py-2 px-3 text-gray-700 leading-tight"/>
      </div>
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2 block">Profile Picture</label>
        <input type="file" className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline w-full
            py-2 px-3 text-gray-700 leading-tight"/>
      </div>
      <div className="justify-center flex">
        <button type="submit" className="rounded focus:outline-none focus:shadow-outline hover:bg-blue-700
            font-bold py-1 px-2 text-white bg-blue-500">Save Changes</button>
      </div>
    </form>
  </div>
    );
  };

  export default EditProfile;