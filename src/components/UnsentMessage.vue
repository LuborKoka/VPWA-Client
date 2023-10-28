<template>
  <q-chat-message
    class="unsent-message"
    :name="`${sender} is typing`"
    :text="[content]"
    text-color="white"
    bg-color="secondary"
  ></q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UnsentMessage',
  props: {
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import '../css/quasar.variables.scss';

.unsent-message {
  opacity: 0.8;

  animation: breathing 2s infinite;

  .q-message-name::after {
    content: '...';
    letter-spacing: 0.2rem;
    margin-left: 0.3rem;
  }
}

@keyframes breathing {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
