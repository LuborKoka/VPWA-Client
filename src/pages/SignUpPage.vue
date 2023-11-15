<template>
  <q-page class="row items-center justify-evenly">
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          Register
        </div>
      </q-card-section>

      <q-form ref="form" class="q-gutter-md">
        <q-card-section>

          <q-input
            name="username"
            id="username"
            v-model.trim="form.username"
            type="text"
            label="Username"
            autofocus
          />
          <q-input
            name="email"
            id="email"
            v-model.trim="form.email"
            type="email"
            label="Email"
          />
          <q-input
            id="password"
            name="password"
            v-model="form.password"
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
          <q-input
            id="password_confirmation"
            name="password_confirmation"
            v-model="form.passwordConfirmation"
            label="Confirm Password"
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
        </q-card-section>

        <q-card-actions align="between">
          <q-btn label="Login" size="sm" flat :to="{ name: 'login' }"></q-btn>
          <q-btn
            label="Register"
            color="primary"
            :loading="loading"
            @click="onSubmit"
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
        API_URL: process.env.API_URL
      }
    },
    computed: {
      redirectTo (): RouteLocationRaw {
        return { name: 'login' }
      },
      loading (): boolean {
        return this.$store.state.auth.status === 'pending'
      }
    },
    methods: {
      onSubmit () {
        //signuppage.vue
        //tuto je problem, vraj auth/register action neexistuje. ale evidentne mame vsetko spravne a koniec koncov, isiel som podla
        //kuricovho githubu doslova copy pase
        this.$store.dispatch('auth/register', this.form).then(() => this.$router.push(this.redirectTo))
      }
    }
  })
  </script>
