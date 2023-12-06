const Logout = () => {
    <div className="h-80 items-center justify-center flex container">
  <div className="bg-white shadow-md text-center m-auto p-6 rounded">
    <p className="text-lg mb-4">Are you sure you want to log out?</p>
    <div className="justify-center flex">
      <button type="submit" className="rounded bg-gradient-to-r bg-amber-500 text-white py-2 px-4 hover:bg-amber-400 ease-in duration-200 mr-1.5">Yes</button>
      <button type="submit" className="rounded bg-gradient-to-r bg-gray-700 text-white py-2 px-4 hover:bg-gray-600 ease-in duration-200 ml-1.5">No</button>
    </div>
  </div>
</div>
}

export default Logout