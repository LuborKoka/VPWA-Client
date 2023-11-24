import { SerializedMessage, UnsentMessage } from 'src/contracts'
import { MutationTree } from 'vuex'
import { ChannelsStateInterface } from './state'
import { ChannelMember } from 'src/contracts/Channels'

const mutation: MutationTree<ChannelsStateInterface> = {
    LOADING_START (state) {
        state.loading = true
        state.error = null
    },
    LOADING_SUCCESS (state, { channel, messages }: { channel: string, messages: SerializedMessage[] }) {
        state.loading = false
        state.messages[channel] = messages
        state.someoneIsTypingMessages[channel] = []
    },
    LOADING_ERROR (state, error) {
        state.loading = false
        state.error = error
    },
    CLEAR_CHANNEL (state, channel) {
        state.active = null
        delete state.messages[channel]
    },
    SET_ACTIVE (state, channel: string) {
        state.active = channel
    },
    NEW_MESSAGE (state, { channel, message }: { channel: string, message: SerializedMessage }) {
        state.messages[channel].push(message)
    },
    NEW_UNSENT_MESSAGE (state, { channel, message }: { channel: string, message: UnsentMessage }) {
        const index = state.someoneIsTypingMessages[channel].findIndex(m => m.sender === message.sender)
        if ( index === -1 ) {
                state.someoneIsTypingMessages[channel].push({
                sender: message.sender,
                content: message.content
            })
            return
        }
        state.someoneIsTypingMessages[channel][index].content = message.content
    },
    DELETE_UNSENT_MESSAGE (state, { channel, message }: { channel:  string, message: UnsentMessage }) {
        console.log(message)
        const index = state.someoneIsTypingMessages[channel].findIndex(m => m.sender === message.sender)
        state.someoneIsTypingMessages[channel].splice(index, 1)
    },
    SET_MEMBERS(state, { channel, members }: { channel: string, members: ChannelMember[]}) {
        state.members[channel] = members
    }
}

export default mutation
