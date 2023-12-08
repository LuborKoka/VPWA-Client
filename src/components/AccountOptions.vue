<template>
  <div class="q-pa-md">
    <q-btn-dropdown class="glossy" color="purple" label="Account Settings">
      <div class="row no-wrap q-pa-md">
        <user-status></user-status>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ username }}
          </div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            @click="logout"
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserStatus from './UserStatus.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    components: {
        UserStatus,
    },
    computed: {
        ...mapGetters('auth', {
            username: ['username']}
        )
    },
    methods: {
        logout() {
            this.$store.dispatch('channels/leave')
            this.$store.dispatch('auth/logout')
        },
    },
});
</script>
