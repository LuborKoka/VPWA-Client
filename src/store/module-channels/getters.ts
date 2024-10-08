import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
    joinedChannels (context) {
        return Object.keys(context.messages)
    },
    currentMessages (context) {
        return context.active !== null ? context.messages[context.active] : []
    },
    lastMessageOf (context) {
        return (channel: string) => {
        const messages = context.messages[channel]
        return messages.length > 0 ? messages[messages.length - 1] : null
        }
    },
    currentMembers(context) {
        return context.active !== null ? context.members[context.active] : []
    },
    unsentMessages(context) {
        return context.active !== null ? context.someoneIsTypingMessages[context.active] : []
    },
    activeChannel(context) {
        return context.active
    }
}

export default getters
