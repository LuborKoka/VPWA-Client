<template>
    <q-item class="shadow-highlight">
      <q-item-section class="full-width q-pa-md text-bold">
        Invitation: {{ title }}
      </q-item-section>
      <q-item-section side>
        <q-icon name="check" class="text-green cursor-pointer icon"/>
      </q-item-section>
      <q-item-section side>
        <q-icon name="close" class="text-red cursor-pointer icon"/>
      </q-item-section>
    </q-item>
  </template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'ChannelInvitation',
    props: {
        title: {
            type: String,
            default: 'Channel Name'
        }
    }
})
</script>



<style lang="scss" scoped>
@import '../css//quasar.variables.scss';
.shadow-highlight {
    box-shadow: 0 0 5px .5px inset $primary;
}

.icon {
    border-radius: 5px;
    transition: background-color .2s;
    &:hover {
        background-color: rgba($secondary, .2);
    }
}
</style>
