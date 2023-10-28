import { Store } from 'vuex';
import { StateType } from './store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StateType>;
  }
}
