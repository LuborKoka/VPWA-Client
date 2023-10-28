import { createStore } from 'vuex';

export type StateType = {
  username: string;
  status: 'online' | 'dnd' | 'offline';
};

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
});
