import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { StatusStateInterface } from './state';

const getters: GetterTree<StatusStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
