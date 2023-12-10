import { User } from 'src/contracts'
import { MutationTree } from 'vuex'
import { AuthStateInterface } from './state'
import { SerializedChannel, Invite } from 'src/contracts/Channels'

const mutations: MutationTree<AuthStateInterface> = {
    AUTH_START (state) {
        state.status = 'pending'
        state.errors = []
    },
    AUTH_SUCCESS (state, user: User | null) {
        state.status = 'success'
        state.user = user
    },
    AUTH_ERROR (state, errors) {
        state.status = 'error'
        state.errors = errors
    },
    ADD_CHANNEL(state, channel: SerializedChannel) {
        const index = state.user?.channels.findIndex(c => c.name === channel.name)
        if ( index === -1 ) state.user?.channels.push(channel)
    },
    REMOVE_CHANNEL(state, channelName) {
        const channels = state.user?.channels || []
        const index = channels?.findIndex(c => c.name === channelName)

        if ( index !== -1 && index !== undefined)
            channels.splice(index, 1)
    },
    REMOVE_INVITE(state, channelName) {
        const invites = state.user?.invitations
        const index = invites?.findIndex(i => i.channelName === channelName)
        if ( index !== -1 && index !== undefined )
            invites?.splice(index, 1)
    },
    ADD_INVITE(state, invite: Invite) {
        state.user?.invitations.splice(0, 0, invite)
    },
    SET_STATUS(state, status: string) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.user!.status = status
    }
}

export default mutations
