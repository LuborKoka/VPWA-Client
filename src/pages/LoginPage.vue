<template>
  <q-page class="row items-center justify-evenly">
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          Login
        </div>
      </q-card-section>

      <q-form ref="form" class="q-gutter-md" @submit.prevent="handleSubmit">
        <q-card-section>
          <q-input
            name="email"
            id="email"
            v-model.trim="credentials.email"
            type="text"
            label="Email"
            autofocus
          />
          <q-input
            id="password"
            name="password"
            v-model="credentials.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            bottom-slots
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-checkbox
            id="rememberMe"
            v-model="credentials.remember"
            label="Remember me"
          />
        </q-card-section>

        <q-card-actions align="between">
          <q-btn label="Create account" size="sm" flat :to="{ name: 'register' }"></q-btn>
          <q-btn
            label="Login"
            color="primary"
            :loading="loading"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LoginPage',
    data () {
      return {
        credentials: { email: '', password: '', remember: false },
        showPassword: false
      }
    },
    computed: {
      loading (): boolean {
        return this.$store.state.auth.status === 'pending'
      }
    },
    methods: {
      handleSubmit () {
        this.$store.dispatch('auth/login', this.credentials).then(() => this.$router.push('/channels?name=General'))
      }
    }
  })
  </script>
