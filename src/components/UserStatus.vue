<template>
  <div class="q-pa-md">
    <q-btn-dropdown :color="color" :label="`Status: ${status}`">
      <q-list>
        <q-item
          v-for="(item, index) in statusItems"
          :key="index"
          clickable
          v-close-popup
          @click="onItemClick(item)"
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'UserStatus',
    data() {
        return {
            statusItems: ref([
                { label: 'Online', color: 'green', val: 'online' },
                { label: 'Do Not Disturb', color: 'red', val: 'dnd' },
                { label: 'Offline', color: 'secondary', val: 'offline' },
            ]),
            status: 'online',
            color: 'green'
        }
    },
    methods: {
        onItemClick(item) {
            this.status = item.label
            this.color = item.color
            this.$store.commit('auth/SET_STATUS', item.val)
        }
    }
})
</script>
