<template>
  <q-page class="full-height column chat-grid">
    <q-scroll-area class="column q-px-md">
      <div class="column q-px-md">
        <q-chat-message
          v-for="message in currentMessages"
          :key="message.id"
          :name="message.senderName"
          :text="[message.content]"
          text-color="white"
          :bg-color="isIncoming(message.senderName) ? 'secondary' : 'primary'"
          :sent="isIncoming(message.senderName)"
        >
        </q-chat-message>
        <unsent-message
          v-for="message in isTypingMessages"
          :sender="message.sender"
          :content="message.content"
          :key="message.sender"
        ></unsent-message>
      </div>
    </q-scroll-area>
    <command-line
      :send-message="sendMessage"
      @input="handleIsTyping"
    ></command-line>
  </q-page>
</template>

<script lang="ts">
import CommandLine from 'src/components/CommandLine.vue';
import UnsentMessage from 'src/components/UnsentMessage.vue';
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

type TypingMessage = {
  sender: string;
  content: string;
};



export default defineComponent({
    components: {
        CommandLine,
        UnsentMessage,
    },
    data() {
        return {
            newMessage: '',
            isTypingMessages: [] as TypingMessage[]
        };
    },
    computed: {
        ...mapGetters('channels', ['currentMessages']),
        ...mapGetters('auth', ['username']),
        activeChannel () {
        return this.$store.state.channels.active
        }
    },
    methods: {
        ...mapActions('channels', ['addMessage']),

        handleIsTyping(event: InputEvent) {
            // toto hadze chyby ale funguje to.. preco?
            const value = (event.target as HTMLInputElement).value.trim()
            console.log(event)

            if ( value.startsWith('/') ) return

            const messageIndex = this.isTypingMessages.findIndex(
                (m) => m.sender === this.username
            );

            if (value === '') {
                if (messageIndex !== -1) {
                    this.isTypingMessages.splice(messageIndex, 1);
                }
            } else {
                if (messageIndex !== -1) {
                    this.isTypingMessages[messageIndex].content = value;
                } else {
                    this.isTypingMessages.push({
                        sender: this.username,
                        content: value,
                    });
                }
            }
        },

        // toto by bolo fajn presunut do command line
        sendMessage(content: string) {
            const unsentMessageIndex = this.isTypingMessages.findIndex(
            (m) => m.sender === this.username
            )

            if (unsentMessageIndex !== -1)
                this.isTypingMessages.splice(unsentMessageIndex, 1)

            this.addMessage({
                channel: this.activeChannel,
                message: content
            })

        },

        isIncoming(senderName: string) {
            return senderName === this.username
        }
    },
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
  flex-basis: 0;
}
.chat-grid {
  display: grid;
  grid-template-rows: 1fr auto;
  z-index: 10;
}
</style>
