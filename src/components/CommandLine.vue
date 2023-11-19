<template>
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
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'CommandLine',
  props: {
    sendMessage: {
      type: Function,
      required: true,
    },
  },
  methods: {
    focusInput() {
      (this.$refs.input as HTMLInputElement).focus();
    },
  },
  setup(props, { emit }) {
    const newMessage = ref('');
    const route = useRoute();

    function handleInput() {
      emit('input');
    }

    function submitMessage() {
      if (newMessage.value.trim() !== '') {
        const channelName = decodeURIComponent(
          route.query.name as string
        );
        props.sendMessage(newMessage.value.trim(), channelName);
        newMessage.value = '';
      }
    }

    return {
      newMessage,
      submitMessage,
      handleInput,
    };
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
