<template>
  <q-page class="row items-center justify-evenly">
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          Register
        </div>
      </q-card-section>

      <q-form ref="form" class="q-gutter-md" @submit.prevent="handleSubmit">
        <q-card-section>

          <q-input
            name="username"
            id="username"
            v-model.trim="form.username"
            type="text"
            label="Username"
            autofocus
            :rules="[
              (val) => val.length >= 4 || 'Please use minimum 4 characters',
            ]"
            lazy-rules
          />
          <q-input
            name="email"
            id="email"
            v-model.trim="form.email"
            type="email"
            label="Email"
            :error="!isEmailValid"
            @input="validateEmail"
            
          />
          <span v-if="!isEmailValid">Please enter a valid email address</span>
           <q-input
            id="password"
            name="password"
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            bottom-slots
            :rules="[
              (val) => val.length >= 8 || 'Please use minimum 8 characters',
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-input
            id="password_confirmation"
            name="password_confirmation"
            v-model="form.passwordConfirmation"
            label="Confirm Password"
            :type="showPassword ? 'text' : 'password'"
            bottom-slots
            :rules="[
              (val) => val.length >= 8 || 'Please use minimum 8 characters',
            ]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn label="Login" size="sm" flat :to="{ name: 'login' }"></q-btn>
          <q-btn
            label="Register"
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
  import { RouteLocationRaw } from 'vue-router'

  export default defineComponent({
    name: 'SignUpPage',
    data () {
      return {
        form: {username: '', email: '', password: '', passwordConfirmation: '' },
        showPassword: false,
        API_URL: process.env.API_URL,
        isEmailValid: true
      }
    },
    computed: {
      redirectTo (): RouteLocationRaw {
        return { name: 'login' }
      },
      loading (): boolean {
        return this.$store.state.auth.status === 'pending'
      },
    },
    methods: {
      handleSubmit () {
        //nenavidim tuto skolu z celeho mojho srdca.
        this.$store.dispatch('auth/register', this.form)
        .then(() =>{
            this.$router.push(this.redirectTo)
        })
      },

      validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailRegex.test(this.form.email);
      return this.isEmailValid
    },
    },
    

  })
  </script>
