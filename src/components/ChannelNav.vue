<template>
  <q-item clickable>
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
export default defineComponent({
  name: 'ChannelNav',
  props: {
    title: {
      type: String,
      default: 'Channel Name',
    },
  },
});
</script>
