<template>
  <q-page class="full-height column chat-grid">
    <q-scroll-area class="column q-px-md">
      <div class="column q-px-md">
        <q-chat-message
          v-for="message in currentMessages"
          :key="message.id"
          :name="message.isIncoming ? message.sender : username"
          :text="[message.content]"
          text-color="white"
          :bg-color="message.isIncoming ? 'secondary' : 'primary'"
          :sent="!message.isIncoming"
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
      :send-message="addMessage"
      @input="handleIsTyping"
    ></command-line>
  </q-page>
</template>

<script lang="ts">
import CommandLine from 'src/components/CommandLine.vue';
import UnsentMessage from 'src/components/UnsentMessage.vue';
import { SerializedMessage } from 'src/contracts';
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

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
        channelName() {
            return decodeURIComponent(this.$route.query.name as string);
        },
        username(): string {
            return this.$store.getters.username;
        },
    },
    setup() {
        const { NEW_MESSAGE } = mapMutations('channels', ['NEW_MESSAGE'])
        return {NEW_MESSAGE}
    },
    methods: {
        handleIsTyping(event: InputEvent) {
            // toto hadze chyby ale funguje to.. preco?
            const value = (event.target as HTMLInputElement).value.trim();

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

        addMessage(content: string) {
            const unsentMessageIndex = this.isTypingMessages.findIndex(
            (m) => m.sender === this.username
            )

            if (unsentMessageIndex !== -1)
                this.isTypingMessages.splice(unsentMessageIndex, 1)

            const message: SerializedMessage = {
                sender: this.username,
                content: content,
                channelId: 'channelID',
                isIncoming: false,
                createdAt: 'date',
                id: 'messageid'
            }
            this.NEW_MESSAGE({
                channel: this.channelName,
                message: message
            })

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
