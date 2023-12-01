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
            <div className="flex flex-row w-screen bg-zinc-800 text-white border-solid border-white border-b-2">
                <div className="flex flex-row w-1/2 justify-start pl-6">
                    <div className="flex rounded-full w-5 h-5 pt-1px bg-zinc-200">
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
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header;