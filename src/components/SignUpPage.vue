<template>
  <div class="flex flex-center screen-height">
    <q-card class="q-pa-md" style="width: 300px">
      <form @submit.prevent="onSignUp">
        <q-card-section>
          <div class="text-h6 q-mb-md" style="color: var(--q-color-primary)">
            Sign Up
          </div>

          <q-input
            v-model="username"
            outlined
            label="Username"
            class="q-mb-xs"
            :rules="[
              (val) => val.lenth >= 4 || 'Please use minimum 4 characters',
            ]"
            lazy-rules
          />
          <q-input
            v-model="password"
            outlined
            label="Password"
            type="password"
            class="q-mb-xs"
            :rules="[
              (val) => val.length >= 8 || 'Please use minimum 8 characters',
            ]"
            lazy-rules
          />
          <q-input
            v-model="confirmPassword"
            outlined
            label="Confirm Password"
            type="password"
            :rules="[(val) => val === password || 'Passwords do not match']"
            lazy-rules
          />

          <q-input v-model="emaik" outlined label="E-mail" type="email" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn color="primary" label="Sign Up" type="submit" />
        </q-card-actions>
      </form>
      <q-card-actions align="center">
        <q-btn
          flat
          label="Already have an account? Log in"
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
      confirmPassword: '',
      email: '',
    };
  },
  methods: {
    onSignUp() {
      this.$store.dispatch('setUsername', this.username);
      this.$router.replace(
        `/chats?channelName=${encodeURIComponent('Channel 1')}`
      );
    },
  },
};
</script>
