import { createStore } from 'vuex';

type State = {
  username: string;
  status: 'online' | 'dnd' | 'offline';
};

export default createStore({
  state: {
    username: '',
    status: 'online', // neviem, ci to treba, ale tak uvidime
  } as State,
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
