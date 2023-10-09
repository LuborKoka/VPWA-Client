<template>
  <div>
    <q-header elevated class="bg-primary q-pa-md text-h6 text-bold">
      # {{ channelName }}
    </q-header>

    <div class="chat-window">
      <chat-message
        v-for="message in messages.filter((m) => m.channelName === channelName)"
        :key="message.id"
        :sender="message.sender"
        :content="message.content"
        :is-incoming="message.isIncoming"
      >
      </chat-message>
    </div>
    <command-line :send-message="addMessage"></command-line>
  </div>
</template>

<script>
import ChatMessage from 'src/components/ChatMessage.vue';
import CommandLine from 'src/components/CommandLine.vue';
export default {
  components: {
    ChatMessage,
    CommandLine,
  },
  data() {
    return {
      newMessage: '',
      messages: [
        {
          id: 1,
          sender: 'User1',
          content: 'Hello!',
          isIncoming: true,
          channelName: 'Channel 1',
        },
        {
          id: 2,
          sender: 'Samo Chladnička',
          content: 'Electrolux',
          isIncoming: true,
          channelName: 'XDDD',
        },
      ],
    };
  },
  computed: {
    channelName() {
      return decodeURIComponent(this.$route.query.channelName);
    },
  },
  methods: {
    addMessage(content, channel) {
      this.messages.push({
        id: this.messages.length + 1,
        sender: 'Me, Myself And I',
        content: content,
        isIncoming: false,
        channelName: channel,
      });
    },
  },
};
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
</style>
