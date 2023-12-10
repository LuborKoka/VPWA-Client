import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStateInterface } from './state'
import { authService, authManager } from 'src/services'
import { LoginCredentials, RegisterData, Invite } from 'src/contracts'
import activitySocketManager from 'src/services/ActivityService'

const actions: ActionTree<AuthStateInterface, StateInterface> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async check ({ state, commit, dispatch }) {
        try {
            commit('AUTH_START')
            const user = await authService.me()
            //toto bude fungovat az po funkcnom logine zrejme
            if (user?.id !== state.user?.id) {
                await dispatch('channels/join', 'General', { root: true })
            }
            commit('AUTH_SUCCESS', user)
            return user !== null
        } catch (err) {
            commit('AUTH_ERROR', err)
            throw err
        }
    },
    async register ({ commit }, form: RegisterData) {
        try {
            commit('AUTH_START')
            const user = await authService.register(form)
            commit('AUTH_SUCCESS', null)
            return user
        } catch (err) {
            commit('AUTH_ERROR', err)
            console.log(err)
            throw err
        }
    },
    async login ({ commit }, credentials: LoginCredentials) {
        try {
            commit('AUTH_START')
            const apiToken = await authService.login(credentials)
            commit('AUTH_SUCCESS', null)
            // save api token to local storage and notify listeners
            authManager.setToken(apiToken.token)
            return apiToken
        } catch (err) {
            commit('AUTH_ERROR', err)
            throw err
        }
    },
    async logout ({ commit, dispatch }) {
        try {
            commit('AUTH_START')
            await authService.logout()
            await dispatch('channels/leave', null, { root: true })
            commit('AUTH_SUCCESS', null)
            // remove api token and notify listeners
            authManager.removeToken()
        } catch (err) {
            commit('AUTH_ERROR', err)
            throw err
        }
    },
    async changeStatus({ commit, getters }, status: string) {
        if ( await activitySocketManager.statusChange(status) !== true ) return
        commit('SET_STATUS', status)
        const username = getters['username']
        commit('channels/SET_MEMBERS_STATUS', {username, status}, {root: true})
    },
    newInvitation({ commit }, invitation: Invite) {
        commit('REMOVE_CHANNEL', encodeURIComponent(invitation.channelName))
        commit('ADD_INVITE', invitation)
    }
}

export default actions
