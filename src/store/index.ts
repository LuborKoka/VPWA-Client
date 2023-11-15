import { createStore } from 'vuex';
import type { IAuthState } from './module-auth/state';
import auth from './module-auth';

export interface IState {
  auth: IAuthState
};
/*
export type StateType = { //toto jest moje
  username: string;
  status: 'online' | 'dnd' | 'offline';
};*/

const store = createStore<IState>({
  modules: {
    auth
  }
});

export default store;

/*
export default createStore({
  state: {
    username: '',
    status: 'online', // neviem, ci to treba, ale tak uvidime
  },
  mutations: {
    SET_USERNAME(state, username) {
      state.username = username;
    },
  },
  actions: {
    setUsername({ commit }, username) {
      commit('SET_USERNAME', username);
    },
  },
  getters: {
    username: (state) => state.username,
  },
});*/
