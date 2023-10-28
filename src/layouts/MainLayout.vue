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
      <available-user username="Peter Paprika" status="online"></available-user>
      <available-user username="Štefan Nátierka" status="dnd"></available-user>
      <available-user
        username="Michal Panvica"
        status="offline"
      ></available-user>
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
    };
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
