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
