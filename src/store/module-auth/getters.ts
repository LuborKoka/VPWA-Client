import { GetterTree } from 'vuex'
import { IState } from '../index'
import { IAuthState } from './state'

const getters: GetterTree<IAuthState, IState> = {
  isAuthenticated (context) {
    return context.user !== null
  }
}

export default getters
