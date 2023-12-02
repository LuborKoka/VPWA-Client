import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { StatusStateInterface } from './state';

const actions: ActionTree<StatusStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
