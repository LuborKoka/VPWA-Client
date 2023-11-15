import { User } from 'src/contracts'
import { MutationTree } from 'vuex'
import { IAuthState } from './state'

const mutations: MutationTree<IAuthState> = {
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
  }
}

export default mutations
