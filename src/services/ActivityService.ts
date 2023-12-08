import { User } from 'src/contracts'
import { authManager } from '.'
import { SocketManager } from './SocketManager'

class ActivitySocketManager extends SocketManager {
    public subscribe (): void {
        this.socket.on('user:list', (onlineUsers: User[]) => {
        console.log('Online users list', onlineUsers)
        })

        this.socket.on('user:online', (user: User) => {
            const username = user.username
            const status = 'online'
            SocketManager.params?.store.commit('channels/SET_MEMBERS_STATUS', {username, status})
        })

        this.socket.on('user:offline', (user: User) => {
            const username = user.username
            const status = 'offline'
            SocketManager.params?.store.commit('channels/SET_MEMBERS_STATUS', {username, status})
        })

        this.socket.on('user:dnd', (user: User) => {
            const username = user.username
            const status = 'dnd'
            SocketManager.params?.store.commit('channels/SET_MEMBERS_STATUS', {username, status})
        })

        authManager.onChange((token) => {
            if (token) {
                this.socket.connect()
            } else {
                this.socket.disconnect()
            }
        })
    }

    public async statusChange(status: string) {
        return this.emitAsync('statusChange', status)
    }
}


const activitySocketManager = new ActivitySocketManager('/')
export default activitySocketManager
