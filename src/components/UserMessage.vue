<template>
  <div
    class="bg-secondary rounded-borders q-py-xs q-px-sm white-text q-ma-xs inline-block"
  >
    <b> {{ sender }}</b
    >: <span> {{ content }}</span>
  </div>
  <br />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UserMessage',
  props: {
    sender: {
      type: String,
      default: 'XD?',
    },
    content: {
      type: String,
      default: 'XDD',
    },
  },
});
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>
