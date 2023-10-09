<template>
  <q-page class="full-height column chat-grid">
    <q-scroll-area>
      <div class="column q-px-md">
        <q-chat-message
          v-for="message in messages.filter(
            (m) => m.channelName === channelName
          )"
          :key="message.id"
          :name="message.isIncoming ? message.sender : username"
          :text="[message.content]"
          text-color="white"
          :bg-color="message.isIncoming ? 'secondary' : 'primary'"
          :sent="!message.isIncoming"
        >
        </q-chat-message>
      </div>
    </q-scroll-area>
    <command-line :send-message="addMessage"></command-line>
  </q-page>
</template>

<script>
import CommandLine from 'src/components/CommandLine.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: {
    CommandLine,
  },
  setup() {
    const store = useStore();
    const username = computed(() => store.getters.username);
    return {
      username,
    };
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
.flex-grow {
  flex-grow: 1;
  flex-basis: 0;
}
.chat-grid {
  display: grid;
  grid-template-rows: 1fr auto;
}
</style>
