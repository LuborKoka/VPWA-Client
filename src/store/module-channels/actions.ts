import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { RawMessage, SerializedMessage } from 'src/contracts'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
    async join ({ commit }, channel: string) {
        try {
            commit('LOADING_START')
            const socket = channelService.in(channel) || channelService.join(channel)
            const messages = await socket.loadMessages()
            commit('LOADING_SUCCESS', { channel, messages })
        } catch (err) {
        commit('LOADING_ERROR', err)
        throw err
        }
    },
    async leave ({ getters, commit }, channel: string | null) {
        const leaving: string[] = channel !== null ? [channel] : getters.joinedChannels

        leaving.forEach((c) => {
        channelService.leave(c)
            commit('CLEAR_CHANNEL', c)
        })
    },
    async addMessage ({ commit }, { channel, message }: { channel: string, message: RawMessage }) {
        const newMessage = await channelService.in(channel)?.addMessage(message)
        if ( typeof newMessage === 'string' ) {
            const message = systemMessage(newMessage)
            return commit('NEW_MESSAGE', { channel, message})
        }
        commit('NEW_MESSAGE', { channel, message: newMessage })
    },
    async getMembers({ commit }, channel: string) {
        const members = await channelService.in(channel)?.loadMembers()
        if ( typeof members === 'string' ) {
            const message = systemMessage(members)
            return commit('NEW_MESSAGE', { channel, message})
        }
        commit('SET_MEMBERS', { channel, members})
    },

    async joinOrCreate({ commit }, {channel, isPrivate}: {channel: string, isPrivate: boolean}) {
        commit('LOADING_START')
        const socket = channelService.in(channel) || channelService.join(channel)
        const newChannel = await socket.joinOrCreateChannel(isPrivate)
        if ( typeof newChannel === 'string' ) {
            const message = systemMessage(newChannel)
            return commit('NEW_MESSAGE', { channel, message})
        }
        commit('ADD_CHANNEL', newChannel)
        const messages = await socket.loadMessages()
        commit('LOADING_SUCCESS', { channel, messages })
        commit('SET_ACTIVE', channel)
    }
}

export default actions




function systemMessage(content: string) {
    const message: SerializedMessage = {
        senderId: 'System',
        senderName: 'System',
        content: content,
        createdAt: new Date().toISOString(),
        id: `SystemMessage${Date.now().toString()}`
    }

    return message
}
