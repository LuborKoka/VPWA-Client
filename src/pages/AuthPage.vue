<template>
  <login-page :swap-forms="swapForms" v-if="isLogin"></login-page>
  <sign-up-page :swap-forms="swapForms" v-else></sign-up-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPage from 'src/components/LoginPage.vue';
import SignUpPage from 'src/components/SignUpPage.vue';

export default defineComponent({
  components: {
    LoginPage,
    SignUpPage,
  },
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    swapForms() {
      this.isLogin = !this.isLogin;
    },
  },
});
</script>
