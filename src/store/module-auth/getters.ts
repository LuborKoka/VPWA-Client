import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStateInterface } from './state'

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  isAuthenticated (context) {
    return context.user !== null
  },

  username (context) {
    return context.user?.username
  },

  channels(context) {
    return context.user?.channels
  }
}

export default getters
