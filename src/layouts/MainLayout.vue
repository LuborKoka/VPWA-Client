<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> # {{ channelName }}</q-toolbar-title>

        <account-options></account-options>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      id="canals"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <div class="drawer-content">
        <!-- Upper Section -->
        <div class="drawer-section">
          <q-card class="bg-primary text-white text-center text-h4">
            Public
          </q-card>
          <q-scroll-area style="height: 100%">
            <div class="infinite-scroller">
              <channel-nav
                v-for="channel in public"
                :title="channel.title"
                :key="channel.title"
              ></channel-nav>
            </div>
          </q-scroll-area>
        </div>

        <!-- Lower Section -->
        <div class="drawer-section">
          <q-card class="bg-primary text-white text-center text-h4">
            Private
          </q-card>
          <q-scroll-area style="height: 100%">
            <div class="infinite-scroller">
              <channel-nav
                v-for="channel in private"
                :title="channel.title"
                :key="channel.title"
              ></channel-nav>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <available-user
        v-for="user in users"
        :key="user.username"
        :username="user.username"
        :status="user.status"
        @mouseover="showProfile(user)"
        @mouseout="hideProfile"
      >
        <template v-slot:default="{ user }">
          <div>
            {{ user.username }}
          </div>
        </template>
      </available-user>
      <q-popup-proxy
        v-model="showUserProfile"
        anchor="bottom-right"
        self="top-left"
        style="z-index: 999"
      >
        <div class="profile-popup">
          <h2>{{ userProfile.username }}</h2>
          <p>Status: {{ userProfile.status }}</p>
          <!-- Add more profile details here -->
        </div>
      </q-popup-proxy>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import ChannelNav from 'src/components/ChannelNav.vue';
import AvailableUser from 'src/components/AvailableUser.vue';
import AccountOptions from 'src/components/AccountOptions.vue';

export default {
  components: {
    ChannelNav,
    AvailableUser,
    AccountOptions,
  },
  computed: {
    channelName() {
      return decodeURIComponent(this.$route.query.channelName);
    },
  },
  data() {
    return {
      public: [
        { title: 'XDDD' },
        { title: 'Channel 1' },
        { title: 'Channel 2' },
        { title: 'Public channel' },
      ],
      private: [
        { title: 'Private 1' },
        { title: 'Private 2' },
        { title: 'Private 3' },
      ],
    };
  },
  setup() {
    const delay = 5000;
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      showUserProfile: false,
      userProfile: {},
      users: [
        { username: 'Peter Paprika', status: 'online' },
        { username: 'Štefan Nátierka', status: 'dnd' },
        { username: 'Michal Panvica', status: 'offline' },
      ],
      delay,
    };
  },

  methods: {
    showProfile(user) {
      if (this.mouseoutTimer) {
        clearTimeout(this.mouseoutTimer);
      }

      this.userProfile = user;
      this.showUserProfile = true;
      this.rightDrawerOpen = false;
      this.leftDrawerOpen = false;
    },

    hideProfile() {
      this.mouseoutTimer = setTimeout(() => {
        this.showUserProfile = false;
        this.leftDrawerOpen = true;
        this.rightDrawerOpen = true;
        this.mouseoutTimer = null;
      }, this.delay);
    },
  },
};
</script>

<style scoped>
.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
