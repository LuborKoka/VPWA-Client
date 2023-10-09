<template>
  <div class="flex flex-center full-width screen-height">
    <q-card class="q-pa-md" style="width: 300px">
      <form @submit.prevent="onLogin">
        <q-card-section>
          <div class="text-h6 q-mb-md" style="color: var(--q-color-primary)">
            Login
          </div>

          <q-input
            v-model="username"
            outlined
            label="Username"
            class="q-mb-md"
          />
          <q-input
            v-model="password"
            outlined
            label="Password"
            type="password"
            :rules="[
              (val) => val.length >= 8 || 'Please use minimum 8 characters',
            ]"
            lazy-rules
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn color="primary" label="Login" type="submit" />
        </q-card-actions>
      </form>
      <q-card-actions align="center">
        <q-btn
          flat
          label="Don't have an account? Sign Up"
          style="font-weight: normal; text-transform: none"
          @click="swapForms"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    swapForms: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch('setUsername', this.username);
      this.$router.replace(
        `/chats?channelName=${encodeURIComponent('Channel 1')}`
        //right here i need to store the username variable in global state
      );
    },
  },
};
</script>

<style lang="scss">
.screen-height {
  height: 100dvh;
}
</style>
