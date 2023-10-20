//  Navbar
//    Current community, logo, search, chat (?), username/karma section


export interface navProps {
    currCommunity: string,
    // URL, need to validate, ya
    logoSource: string,
    // can get the username and the karma of the user from the API, using userID
    userID: string,
}
const Navbar = (props: navProps) => {
    return (
        <>
        THIS IS THE NAVBAR
        </>
    )
}

export default Navbar;