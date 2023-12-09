<template>
  <div>
    <q-btn @click="emitClick" class="available-user-button" align="left">
      <q-item>
        <q-item-section avatar>
          <q-icon
            name="person"
            class="icon-with-status q-pa-xs"
            :class="status"
          ></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label style="text-transform: none;"> {{ username }}</q-item-label> <!--how do i make this not upper case the text?-->
        </q-item-section>
      </q-item>
      <q-popup-proxy>
        <div class="q-pa-md q-gutter-y-md"
        style="min-height: 100px; min-width: 265px;" align="left">



        <q-item-section side>
        <q-avatar rounded size="96px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />

        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 24px;">

          {{ username }}
        </q-item-label>
        <q-item-label >
          <q-badge class="custom-badge" style="font-size: 20px; padding: 10px;" :color="statusColor"> {{ formattedStatus }}</q-badge>
        </q-item-label>

        <q-item-label caption>235 messages</q-item-label>
        <q-item-label caption>Member since: {{ currentDate }} </q-item-label>
      </q-item-section>

      </div>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'AvailableUser',
  props: {
    username: {
      type: String,
      default: 'Jožo',
    },
    status: {
      type: String as PropType<'online' | 'dnd' | 'offline'>,
      required: true,
      validator: (value: string) => {
        return ['online', 'dnd', 'offline'].includes(value);
      },
    },
  },

  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  },

  computed: {
    statusColor() {
      // Define a function to map status text to colors
      const statusColorMap = {
        online: 'green', // Customize colors as needed
        offline: 'grey',
        dnd: 'red',
      };
      // Use the map to get the color
      return statusColorMap[this.status] || 'default-color';
    },

    formattedStatus() {
      // Define a map for formatting status text
      const statusTextMap = {
        online: 'Online',
        offline: 'Offline',
        dnd: 'Do not Disturb',
      };
      return statusTextMap[this.status] || this.status; // Use the formatted text or original status
    },

  },


  methods: {
    emitClick() {
      this.$emit('click', this.username, this.status);
    },




  },
});
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

@mixin statusIcon() {
  $statusIndicatorSize: 10px;

  content: '';
  position: absolute;
  width: $statusIndicatorSize;
  height: $statusIndicatorSize;
  border-radius: 50%;
  right: 5%;
  bottom: 5%;
  z-index: 1;
}
.icon-with-status {
  color: $white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: $secondary;
    z-index: -1;
  }
}

.online::after {
  @include statusIcon();
  background-color: green;
}

.offline::after {
  @include statusIcon();
  border: 1px solid $secondary;
  background-color: $white;
}

.dnd::after {
  @include statusIcon();
  background-color: red;
  color: $white;
}

.available-user-button {
  text-align: left; // Adjust the alignment as needed
  width: 100%; // Make the button fill the available width
}

.custom-badge {
  font-size: 28px; /* Adjust the size as needed */
  padding: 5px 10px; /* Adjust the padding as needed */
  border-radius: 20px; /* Makes it rounder */
}

</style>
