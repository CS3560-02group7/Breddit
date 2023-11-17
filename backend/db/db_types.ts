export interface Account {
    emailAddress: string,
    username: string,
    password: string,
    profilePicture: string,
    reputation: number
}

export interface Comment {
    content: string,
    reputation: number,
    communityID: number,
    userID: number,
    postID: number
}

export interface Community {
    communityID: number,
    name: string,
    description: string,
    picture: string
}

export interface Post {
    postID: number,
    title: string,
    postType: number,
    body: string,
    date: Date,
    reputation: number,
    communityID: number,
    userID: number
}

export interface UserCommunityRole {
    // id is autoincrement, don't need it. Might also remove that id from the db, idk for sure
    roleInCommunity: string,
    userID: number,
    communityID: number
}