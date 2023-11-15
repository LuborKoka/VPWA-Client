import { Store } from 'vuex';
import { TState } from './store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<TState>;
  }
}

