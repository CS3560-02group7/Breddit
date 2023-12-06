const Logout = () => {
    <div className="h-80 items-center justify-center flex container">
  <div className="bg-white shadow-md text-center m-auto p-6 rounded">
    <p className="text-lg mb-4">Are you sure you want to log out?</p>
    <div className="justify-center flex">
      <button type="submit" className="rounded bg-red-500 text-white py-2 px-4 mr-1.5">Yes</button>
      <button type="submit" className="rounded bg-blue-500 text-white py-2 px-4 ml-1.5">No</button>
    </div>
  </div>
</div>
}

export default Logout