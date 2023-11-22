import { SerializedMessage } from 'src/contracts'
import { ChannelMember } from 'src/contracts/Channels'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: string]: SerializedMessage[] },
  members: { [channel: string]: ChannelMember[]},
  active: string | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    members: {},
    active: null
  }
}

export default state
