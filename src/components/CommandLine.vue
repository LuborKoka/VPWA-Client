<template>
    <confirmation-popup :popupVisible="isOpenPopup" :setIsOpen="closePopup"
        :text="confirmationText" :callback="callback">
    </confirmation-popup>
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
import { SerializedMessage } from 'src/contracts';
import ConfirmationPopup from './ConfirmationPopup.vue';
import { channelService } from 'src/services';
import { defineComponent, ref } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
    name: 'CommandLine',
    components: {
        ConfirmationPopup
    },
    computed: {
        ...mapGetters('auth', ['channels', 'username'])
    },
    data() {
        return {
            isOpenPopup: false,
            newMessage: ref(''),
            // eslint-disable-next-line @typescript-eslint/ban-types
            callback: undefined as (() => Promise<void>) | undefined,
            confirmationText: ''
        }
    },
    methods: {
        ...mapActions('channels', ['addMessage']),

        closePopup() {
            this.isOpenPopup = false
        },

        openPopup(confirmationText: string) {
            this.confirmationText = confirmationText
            this.isOpenPopup = true
        },

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

        displayErrMsg(content: string) {
            const channel = this.$route.query.name?.toString()
            const message: SerializedMessage = {
                senderId: 'system',
                senderName: 'System',
                content,
                createdAt: new Date().toISOString(),
                id: `SystemMessage${Date.now().toString()}`
            }
            this.$store.commit('channels/NEW_MESSAGE', {channel, message})
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

        navigate(channelName: string) {
            this.$store.commit('channels/SET_ACTIVE', 'Generals')
            this.$router.push({
                path: '/channels',
                query: { name: channelName },
            })
        },


        async handleCommand(command: string, channelName: string) {
            const commands = command.split(' ')
            let name: string

            switch(commands[0]) {
                case '/list':
                    this.$store.dispatch('channels/getMembers', channelName)
                    return
                case '/join':
                    this.callback = async () => {
                        const newChannelName = commands.at(-1) === '-p' ?
                            encodeURIComponent(commands.slice(1, -1).join(' ')) :
                            encodeURIComponent(commands.slice(1).join(' '))

                        const isPrivate = commands.at(-1) === '-p'

                        await this.$store.dispatch('channels/joinOrCreate', { channel: newChannelName, isPrivate})

                        this.navigate(newChannelName)
                    }
                    this.openPopup('You will join or create a new channel.')
                    return


                case '/quit':
                    this.callback = async() => {
                        const res = await channelService.in(channelName)?.deleteChannel(this.username)

                        if ( typeof res === 'string' ) return this.displayErrMsg(res)

                        if ( res === true ) {
                            channelService.leave(channelName)
                            this.$store.dispatch('channels/leave', channelName)
                            this.$store.commit('auth/REMOVE_CHANNEL', channelName)
                            this.navigate('General')
                        }
                    }
                    this.openPopup('You will delete this channel (if allowed).')
                    return

                case '/cancel':
                    this.callback = async () => {
                        const deleteChannel = await channelService.in(channelName)?.quitChannel()

                        if ( typeof deleteChannel === 'string' ) {
                            return this.displayErrMsg(deleteChannel)
                        }

                        if ( deleteChannel ) {
                            this.$store.dispatch('channels/leave', channelName)
                            channelService.leave(channelName)
                            if ( deleteChannel.isPrivate)
                                this.$store.commit('auth/REMOVE_CHANNEL', channelName)
                        }

                        this.navigate('General')
                    }

                    this.openPopup('You will leave the channel. If you\'re the admin, you will delete it.')
                    return

                case '/invite':
                    this.callback =async () => {
                        name = command.split(' ').slice(1).join(' ')
                        const res = await channelService.in(channelName)?.inviteToChannel(this.username, name)
                        if ( typeof res === 'string' ) return this.displayErrMsg(res)
                        if ( res === true ) return this.displayErrMsg('User invited.') //jako neni to uplne error message, ale whatever
                    }

                    this.openPopup('You will invite a new user.')
                    return

                case '/revoke':
                    this.callback =async () => {
                        name = command.split(' ').slice(1).join(' ')
                        const res = await channelService.in(channelName)?.revokeFromChannel(this.username, name)
                        if ( typeof res === 'string' ) return this.displayErrMsg(res)
                        if ( res === true ) return this.displayErrMsg('User revoked.')
                    }
                    this.openPopup('You will revoke a user.')
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
