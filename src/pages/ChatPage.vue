<template>
  <div>
    <q-header elevated class="bg-primary q-pa-md text-h6 text-bold">
      # {{ decodeURIComponent(channelName) }}
    </q-header>

    <div class="chat-window">
      <user-message
        v-for="message in messages"
        :key="message.id"
        :sender="message.sender"
        :content="message.content"
      >
      </user-message>
    </div>
    <command-line></command-line>
  </div>
</template>

<script>
import UserMessage from 'src/components/UserMessage.vue';
import CommandLine from 'src/components/CommandLine.vue';
export default {
  components: {
    UserMessage,
    CommandLine,
  },
  data() {
    return {
      newMessage: '',
      messages: [
        { id: 1, sender: 'User1', content: 'Hello!' },
        { id: 2, sender: 'Samo Chladnička', content: 'Electrolux' },
        // ...more messages
      ],
    };
  },
  computed: {
    channelName() {
      return this.$route.query.channelName;
    },
  },
};
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 16px;
}
</style>
