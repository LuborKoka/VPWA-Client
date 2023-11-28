export type ChannelMember = {
    username: string,
    status: string
}


export type SerializedChannel = {
    id: string,
    name: string,
    isPrivate: boolean,
    isMember: boolean
}


export type Invite = {
    id: string,
    createdAt: string,
    channelName: string,
    isPrivate: boolean
}
