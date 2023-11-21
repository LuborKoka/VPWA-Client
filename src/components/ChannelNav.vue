<template>
  <q-item clickable @click="setActiveChannel">
    <router-link
      class="text-primary text-bold full-width q-pa-md text-decoration-none display-block"
      :to="{
        path: '/channels',
        query: { name: encodeURIComponent(title) },
      }"
    >
      # {{ title }}
    </router-link>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapActions } from 'vuex';
export default defineComponent({
  name: 'ChannelNav',
  props: {
    title: {
      type: String,
      default: 'Channel Name',
    },
  },
  methods: {
    ...mapMutations('channels', ['SET_ACTIVE']),
    ...mapActions('channels', ['join']),

    setActiveChannel() {
        this.SET_ACTIVE(this.title)
        this.join(this.title)
    }
  }
});
</script>
