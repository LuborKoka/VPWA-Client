import { SerializedChannel } from './Channels'

export interface ApiToken {
  type: 'bearer'
  token: string
  expires_at?: string
  expires_in?: number
}

export interface RegisterData {
  email: string
  password: string
  passwordConfirmation: string
}

export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export type Invitation = {
    id: string,
    channelName: string,
    createdAt: string,
    isPrivate: boolean
}

export interface User {
    id: string
    email: string
    isMuted: boolean,
    username: string,
    status: string,
    channels: SerializedChannel[],
    invitations: Invitation[]
}
