import { SerializedMessage, UnsentMessage } from 'src/contracts'
import { ChannelMember } from 'src/contracts/Channels'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: string]: SerializedMessage[] },
  members: { [channel: string]: ChannelMember[]},
  someoneIsTypingMessages: { [channel: string]: UnsentMessage[] },
  active: string | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    members: {},
    someoneIsTypingMessages: {},
    active: null
  }
}

export default state
