<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> # {{ channelName }}</q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <channel-nav title="Channel 1"></channel-nav>
      <channel-nav title="Channel 2"></channel-nav>
      <channel-nav title="XDDD"></channel-nav>
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

export default {
  components: {
    ChannelNav,
    AvailableUser,
  },
  computed: {
    channelName() {
      return decodeURIComponent(this.$route.query.channelName);
    },
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
