//  Navbar
//    Current community, logo, search, chat (?), username/karma section


export interface headerProps {
    currCommunity: string,
    // URL, need to validate, ya
    logoSource: string,
    // can get the username and the karma of the user from the API, using userID
    userID: string,
}
const Header = (props: headerProps) => {
    return (
        <>
            <div className="flex flex-row w-screen bg-slate border-solid border-black border-b-2">
                <div className="flex flex-row w-1/2 justify-start pl-6">
                    <div className="flex w-5 h-5 pt-1px">
                        <a href="../Home">
                            <img className="object-cover" src={props.logoSource} alt="Breddit Logo" />
                        </a>
                    </div>
                    <div className="pl-2">
                        {props.currCommunity}
                    </div>
                </div>
                <div className="flex flex-row w-1/2 justify-end pr-6">
                    <div>
                        {props.userID}
                        <a className="text-white-500 hover:underline mt-4 px-4" href="/">
                                Logout
                            </a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header;