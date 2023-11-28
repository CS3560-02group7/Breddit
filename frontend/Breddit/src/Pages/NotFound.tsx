
const NotFound = () => {
    return (
        <>
            <div className="flex flex-col bg-gray-800 h-screen place-content-center">
                <div className="basis-1/3 center">
                    Sorry, we couldn't find that :(
                </div>
                <button className="basis-1/3 text-white bg-amber-500 hover:bg-amber-600 w-1/6">
                    Return to Home
                </button>
            </div>
        </>
    )
}

export default NotFound;