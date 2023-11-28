import { RawMessage, SerializedMessage, UnsentMessage } from 'src/contracts'
import { BootParams, SocketManager } from './SocketManager'
import { ChannelMember, SerializedChannel } from 'src/contracts/Channels'

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
    public subscribe ({ store }: BootParams): void {
        const channel = this.namespace.split('/').pop() as string

        this.socket.on('message', (message: SerializedMessage) => {
            store.commit('channels/NEW_MESSAGE', { channel, message })
            const unsentMessage: UnsentMessage = {
                sender: message.senderName,
                content: message.content
            }
            store.commit('channels/DELETE_UNSENT_MESSAGE', { channel, message: unsentMessage })
        })


        this.socket.on('unsentMessage', (message: UnsentMessage) => {
            message.content === '' ?
                store.commit('channels/DELETE_UNSENT_MESSAGE', { channel, message }) :
                store.commit('channels/NEW_UNSENT_MESSAGE', {channel, message})
        })
    }

    public addMessage (message: RawMessage): Promise<SerializedMessage> {
        return this.emitAsync('addMessage', message)
    }

    public unsentMessage (message: string): Promise<unknown> {
        return this.emitAsync('unsentMessage', message)
    }

    public loadMessages (): Promise<SerializedMessage[]> {
        return this.emitAsync('loadMessages')
    }

    public loadMembers(): Promise<ChannelMember[]> {
        return this.emitAsync('loadMembers')
    }

    public joinNewChannel(username: string): Promise<boolean> {
        return this.emitAsync('joinChannel', username)
    }

    public createChannel(username: string, isPrivate: boolean): Promise<SerializedChannel> {
        return this.emitAsync('createChannel', username, isPrivate)
    }

    public deleteChannel(username: string): Promise<boolean> {
        return this.emitAsync('deleteChannel', username)
    }

    public quitChannel(username: string): Promise<boolean> {
        return this.emitAsync('quitChannel', username)
    }

    public inviteToChannel(username: string, targetName: string): Promise<boolean> {
        return this.emitAsync('inviteToChannel', username, targetName)
    }

    public revokeFromChannel(username: string, targetName: string): Promise<boolean> {
        return this.emitAsync('revokeFromChannel', username, targetName)
    }
}

class ChannelService {
    private channels: Map<string, ChannelSocketManager> = new Map()

    public join (name: string): ChannelSocketManager {
        if (this.channels.has(name)) {
        throw new Error(`User is already joined in channel "${name}"`)
        }

        // connect to given channel namespace
        const channel = new ChannelSocketManager(`/channels/${name}`)
        this.channels.set(name, channel)
        return channel
    }

    public leave (name: string): boolean {
        const channel = this.channels.get(name)

        if (!channel) {
        return false
        }

        // disconnect namespace and remove references to socket
        channel.destroy()
        return this.channels.delete(name)
    }

    public in (name: string): ChannelSocketManager | undefined {
        return this.channels.get(name)
    }
}

const channelService = new ChannelService()

export default channelService
