<template>
  <div
    class="rounded-borders q-py-xs q-px-sm white-text q-ma-xs message-bubble"
    :class="isIncoming ? 'incoming bg-secondary' : 'outgoing bg-primary'"
  >
    <b> {{ sender }}</b
    >: <span> {{ content }}</span>
  </div>
  <br />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ChatMessage',
  props: {
    sender: {
      type: String,
      default: 'XD?',
    },
    content: {
      type: String,
      default: 'XDD',
    },
    isIncoming: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.message-bubble {
  max-width: 70%;
  width: auto;
}

.incoming {
  align-self: flex-start;
}

.outgoing {
  align-self: flex-end;
}
</style>
