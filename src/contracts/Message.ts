export type RawMessage = string

export interface SerializedMessage {
    senderId: string,
    senderName: string,
    content: string,
    createdAt: string,
    id: string
}

export type UnsentMessage = {
    sender: string,
    content: string
}
