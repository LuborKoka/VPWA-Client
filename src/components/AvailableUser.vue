<template>
  <div>
  <q-item>
    <q-item-section avatar>
      <q-icon
        name="person"
        class="icon-with-status q-pa-xs"
        :class="status"
      ></q-icon>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ username }}</q-item-label>
    </q-item-section>
  </q-item>
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
</style>
