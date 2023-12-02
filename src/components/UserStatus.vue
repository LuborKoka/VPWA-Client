<template>
  <div class="q-pa-md">
    <q-btn-dropdown :color="statusColor" :label="`Status: ${status}`">
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
import { ref, defineComponent, useStore , computed} from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  computed: {
        ...mapGetters('auth', {
            username: ['username'],
            userstatus: ['status']
          })
    },


  setup() {
    const statusItems = ref([
      { label: 'Online', color: 'green' },
      { label: 'Do Not Disturb', color: 'red' },
      { label: 'Offline', color: 'secondary' },
    ]);

    /*const username = computed(() => {
      return this.$store.getters['auth/username'];
    });
    */
    //const initialStatus = $store.getItem('auth/status') || ref(statusItems.value[0].label);
    //const status = ref(initialStatus);


    const status = ref(statusItems.value[0].label);
    const statusColor = ref(statusItems.value[0].color);

    //dorobit, aby to aj nieco realne robilo a nie len menilo farby
    const onItemClick = (item) => {
      status.value = item.label;
      statusColor.value = item.color;
     // console.log(userstatus);
      
    };

    return {
      status,
      statusColor,
      statusItems,
      onItemClick,
    };
  },
});
</script>
