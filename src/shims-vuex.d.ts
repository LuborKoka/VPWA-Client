import { Store } from 'vuex';
import { IStoreState } from './store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IStoreState>;
  }
}

