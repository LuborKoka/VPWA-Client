<template>
  <q-page class="full-height column chat-grid">
    <q-scroll-area class="column q-px-md">
      <div class="column q-px-md">
        <q-chat-message
          v-for="message in channels.find((c) => c.name === channelName)
            ?.messages"
          :key="message.id"
          :name="message.isIncoming ? message.sender : username"
          :text="[message.content]"
          text-color="white"
          :bg-color="message.isIncoming ? 'secondary' : 'primary'"
          :sent="!message.isIncoming"
        >
        </q-chat-message>
        <unsent-message
          v-for="message in channels.find((c) => c.name === channelName)
            ?.isTypingMessages"
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
import { defineComponent } from 'vue';

type TTypingMessage = {
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
      channels: [
        {
          name: 'Channel 1',
          messages: [
            {
              id: 1,
              sender: 'Erik Hruška',
              content: 'Hruska z Lidlu',
              isIncoming: true,
            },
          ],
          isTypingMessages: [] as TTypingMessage[],
        },
      ],
    };
  },
  computed: {
    channelName() {
      return decodeURIComponent(this.$route.query.channelName as string);
    },
    username(): string {
      return this.$store.getters.username;
    },
  },
  methods: {
    handleIsTyping(event: InputEvent) {
      const channel = this.channels.find((c) => c.name === this.channelName);
      if (!channel) return;

      const value = (event.target as HTMLInputElement).value;

      const messageIndex = channel.isTypingMessages.findIndex(
        (m) => m.sender === this.username
      );

      if (value === '') {
        if (messageIndex !== -1) {
          channel.isTypingMessages.splice(messageIndex, 1);
        }
      } else {
        if (messageIndex !== -1) {
          channel.isTypingMessages[messageIndex].content = value;
        } else {
          channel.isTypingMessages.push({
            sender: this.username,
            content: value,
          });
        }
      }
    },

    addMessage(content: string, channelName: string) {
      const channel = this.channels.find((c) => c.name === channelName);

      if (channel) {
        const unsentMessageIndex = channel.isTypingMessages.findIndex(
          (m) => m.sender === this.username
        );

        if (unsentMessageIndex !== -1)
          channel.isTypingMessages.splice(unsentMessageIndex, 1);

        channel.messages.push({
          id: channel.messages.length + 1,
          sender: this.username,
          content: content,
          isIncoming: false,
        });
      }
    },
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
}
</style>
