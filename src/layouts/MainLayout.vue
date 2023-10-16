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

    <q-drawer id="channel_list" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <channel-nav title="Channel 1"></channel-nav>
      <channel-nav></channel-nav>
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
//import { ref } from 'vue';
import { ref, onMounted , watchEffect } from 'vue';
import ChannelNav from 'src/components/ChannelNav.vue';
import AvailableUser from 'src/components/AvailableUser.vue';
import AccountOptions from 'src/components/AccountOptions.vue';
import { eventBus } from 'src/components/EventBus';

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


  setup() {
    

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    const channelTitles = ref([]);


    onMounted(() => {
      // Try to retrieve channelTitles from local storage
      const storedChannelTitles = localStorage.getItem('channelTitles');

      // If it exists in local storage, parse and set it
      if (storedChannelTitles) {
        channelTitles.value = JSON.parse(storedChannelTitles);
      } else {
        // Otherwise, initialize it with default values
        channelTitles.value = ['Channel 1', 'Channel 2', 'XDDD'];
      }
    });

    watchEffect(() => {
      localStorage.setItem('channelTitles', JSON.stringify(channelTitles.value));
    });
    
    eventBus.on('addChannelNavComponents', newChannelName => {
      this.addChannelNavComponents(newChannelName);
    });

    return {
  
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      channelTitles,
    };
  

    

    
      
    
  },

  

  methods: {
    addChannelNavComponents(newChannelTitles) {
      // Create an array of ChannelNav components with titles to add

      if (typeof newChannelTitles === 'string')
      {
        this.channelTitles = [...this.channelTitles, ...newChannelTitles];

        this.$root.$emit('update-dynamic-components', this.channelTitles);
      }
      else
      {
        console.error('nechChannelTitle should be a string');
      }

      
      

      
    },

    created() {
        // Listen for the 'update-dynamic-components' event and update the components
        this.$root.$on('update-dynamic-components', newChannelTitles => {
          this.channelTitles = newChannelTitles;
        });
      },


  },


  



};
</script>
