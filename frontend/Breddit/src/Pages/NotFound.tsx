import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="flex bg-offwhite h-screen justify-center items-center">
                <div className="flex flex-col bg-slate-gray w-1/4 h-1/3 rounded-lg items-center">
                    <div className="flex h-1/3 text-white items-center">
                        <h1 className="text-2xl font-bold">Page Not Found</h1>
                    </div>
                    <div className="flex text-white h-1/3 items-center">
                        Sorry, the page you requested does not exist.
                    </div>
                    <div className="flex items-center h-1/3">
                        <Link to={"../../"}>
                            <button className="h-12 w-36 rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-white">
                                Return to Home
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
export default NotFound;