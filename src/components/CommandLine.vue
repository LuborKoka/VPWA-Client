<template>
  <form class="q-pa-md" @submit.prevent="submitMessage" @submit="focusInput">
    <input
      v-model="newMessage"
      class="q-py-xs q-px-sm command-line"
      type="text"
      required
      placeholder="Type your command"
      ref="input"
      @input="handleInput"
    />

    <q-btn type="submit" round class="q-ml-md" icon="send" />
  </form>
</template>

<script lang="ts">
import { SerializedChannel } from 'src/contracts/Channels';
import { channelService } from 'src/services';
import { defineComponent, ref } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
    name: 'CommandLine',
    computed: {
        ...mapGetters('auth', ['channels', 'username'])
    },
    setup() {
        const newMessage = ref('');
        return {
            newMessage,
        };
    },
    methods: {
        ...mapActions('channels', ['addMessage']),

        focusInput() {
            (this.$refs.input as HTMLInputElement).focus()
        },

        handleInput() {
            const value = this.newMessage.trim()
            // if is command
            if ( value.startsWith('/') ) return

            const channelName = this.$route.query.name as string
            channelService.in(channelName)?.unsentMessage(value)
        },


        submitMessage() {
            const value = this.newMessage.trim()
            const channelName = this.$route.query.name as string
            if ( value.startsWith('/') ) {
                this.handleCommand(value, channelName)
                this.newMessage = ''
                return
            }

            if (value !== '') {
                this.addMessage({
                    channel: channelName,
                    message: value
                })

                this.newMessage = ''
            }
        },


        async handleCommand(command: string, channelName: string) {
            /**
             * @param channelName
             *      the name of the current channel, encodeURIComponent is called inside this function
             *
             */

            channelName = encodeURIComponent(channelName)
            const commands = command.split(' ')
            let name: string

            switch(commands[0]) {
                case '/list':
                    this.$store.dispatch('channels/getMembers', channelName)
                    return
                case '/join':
                    const channels = this.channels as SerializedChannel[]
                    let channel = channels.find(c => c.name === channelName)

                    //join public channel
                    if ( channel && channel.isMember === false ) {
                        console.log('but why???')
                        const channelSocket = await channelService.in(channelName)
                        channelSocket?.joinNewChannel(this.username)
                        channel.isMember = true
                        return
                    }
                    const newChannelName = commands.at(-1) === '-p' ?
                        encodeURIComponent(commands.slice(1, -1).join(' ')) :
                        encodeURIComponent(commands.slice(1).join(' '))
                    channel = channels.find(c => c.name === newChannelName)
                    //create a new channel
                    if ( !channel || channel.isMember === false ) {
                        const socket = channelService.join(newChannelName)
                        const isPrivate = commands.at(-1) === '-p'

                        const newChannel = await socket.createChannel(this.username, isPrivate)

                        this.$store.commit('auth/ADD_CHANNEL', newChannel)
                    }
                    return


                case '/quit':
                    const success = await channelService.in(channelName)?.deleteChannel(this.username)

                    if ( success === true ) {
                        channelService.leave(channelName)
                        this.$store.commit('auth/REMOVE_CHANNEL', channelName)
                    }
                    return

                case '/cancel':
                    const deleteChannel = await channelService.in(channelName)?.quitChannel(this.username)
                    channelService.leave(channelName)
                    if ( deleteChannel === true )
                        this.$store.commit('auth/REMOVE_CHANNEL', channelName)
                    return

                case '/invite':
                    name = command.split(' ').slice(1).join(' ')
                    await channelService.in(channelName)?.inviteToChannel(this.username, name)
                    return

                case '/revoke':
                    name = command.split(' ').slice(1).join(' ')
                    await channelService.in(channelName)?.revokeFromChannel(this.username, name)
                    return
            }
        }
    },
});


</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

form {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  outline: none;
  border: 1px solid rgba($secondary, 0.6);
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 5px 1px rgba($secondary, 0.3);
  transition: border-color 0.4s ease-in, box-shadow 0.4s ease-in;
  flex-grow: 1;
  flex-basis: 0;

  &:focus,
  &:valid {
    border-color: $primary;
    box-shadow: 0 0 5px 1px rgba($primary, 0.3);
  }

  &:valid ~ button {
    color: $primary;
    background-color: transparent;
  }
}

button {
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: $secondary;
  color: $white;
  cursor: pointer;
  min-height: unset;
  min-width: unset;
  font-size: 0.7rem;
  padding: 6px;
  transition: color 0.4s ease-in;
  box-shadow: 0 0 5px 1px rgba($secondary, 0.5);
}
</style>
