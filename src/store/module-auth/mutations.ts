import { User } from 'src/contracts'
import { MutationTree } from 'vuex'
import { AuthStateInterface } from './state'
import { SerializedChannel } from 'src/contracts/Channels'

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
    state.user?.channels.push(channel)
  },
  REMOVE_CHANNEL(state, channelName) {
    const channels = state.user?.channels || []
    const index = channels?.findIndex(c => c.name === channelName)

    channels?.splice(index, 1)
  }
}

export default mutations
