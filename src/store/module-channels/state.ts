import { SerializedMessage } from 'src/contracts'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: string]: SerializedMessage[] } // give me an example of a property with this type please
  active: string | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: { // toto treba potom vymazat, samozrejme
        General: [
            {
                id: 'uuid',
                content: 'content',
                channelId: 'channelId',
                createdAt: 'date',
                sender: 'Jozo',
                isIncoming: true
            },
            {
                id: 'uuid',
                content: 'content',
                channelId: 'channelId',
                createdAt: 'date',
                sender: 'Nozo',
                isIncoming: false
            }
        ]
    },
    active: null
  }
}

export default state
