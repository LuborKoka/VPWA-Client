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
                <channel-invitation
                    v-for="inv in invitations.filter(i => !i.isPrivate)"
                    :title="inv.channelName"
                    :id="inv.id"
                    :key="inv.channelName"
                ></channel-invitation>
                <channel-nav
                    v-for="channel in channels.filter(c => !c.isPrivate)"
                    :title="decodeURIComponent(channel.name)"
                    :key="channel.name"
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
                <channel-invitation
                    v-for="inv in invitations.filter(i => i.isPrivate)"
                    :title="inv.channelName"
                    :id="inv.id"
                    :key="inv.channelName"
                ></channel-invitation>
                <channel-nav
                    v-for="channel in channels.filter(c => c.isPrivate)"
                    :title="decodeURIComponent(channel.name)"
                    :key="channel.name"
                ></channel-nav>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>

    <div class="q-pa-md">



      <available-user

        v-for="user in currentMembers"

        :key="user.username"
        :username="user.username"
        :status="user.status"
        @click="handleUserClick"

      >
      </available-user>



      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue';
import ChannelNav from 'src/components/ChannelNav.vue';
import AvailableUser from 'src/components/AvailableUser.vue';
import AccountOptions from 'src/components/AccountOptions.vue';
import ChannelInvitation from 'src/components/ChannelInvitation.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    components: {
        ChannelNav,
        AvailableUser,
        AccountOptions,
        ChannelInvitation
    },
    computed: {
        ...mapGetters('auth', ['channels', 'invitations']),
        ...mapGetters('channels', ['currentMembers']),
        channelName() {
            return decodeURIComponent(this.$route.query.name);
        },
    },
    setup() {
        const cursorPosition = ref({ x: 0, y: 0 });

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
        cursorPosition,
        showUserProfile: false,
        users: [
            { username: 'Peter Paprika', status: 'online' },
            { username: 'Štefan Nátierka', status: 'dnd' },
            { username: 'Michal Panvica', status: 'offline' },
        ],
        delay,
        };
    },


});
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
