export type RawMessage = string

export interface SerializedMessage {
  sender: string
  content: string
  channelId: string,
  createdAt: string,
  id: string,
  isIncoming: boolean
}
