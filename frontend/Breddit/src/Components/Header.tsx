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
            <div className="flex flex-row w-screen">
                <div>
                    {props.logoSource}
                </div>
                <div>
                    {props.currCommunity}
                </div>
                <div>
                    {props.userID}
                </div>
            </div>
        </>
    )
}

export default Header;