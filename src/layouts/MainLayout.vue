<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <channel-nav title="Channel 1"></channel-nav>
      <channel-nav title="Channel 2"></channel-nav>
      <channel-nav title="XDDD"></channel-nav>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      side="right"
      bordered
      content-class="bg-grey-1"
    >
      <available-user status="online" username="Peter Paprika"></available-user>
      <available-user status="dnd" username="Samo Chladnička"></available-user>
      <available-user
        status="offline"
        username="Štefan Nátierka"
      ></available-user>
    </q-drawer>
  </q-layout>
</template>

<script>
import ChannelNav from 'src/components/ChannelNav.vue';
import AvailableUser from 'src/components/AvailableUser.vue';

export default {
  components: {
    ChannelNav,
    AvailableUser,
  },

  data() {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: false,
    };
  },
};
</script>
