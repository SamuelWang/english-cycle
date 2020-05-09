import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const base = {
  state: {
    initialPath: '',
    user: {
      uid: '',
      email: '',
      name: '',
    },
  },
  mutations: {
    SET_INITIAL_PATH(state, path) {
      state.initialPath = path;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    clearUser({ commit }) {
      commit('SET_USER', {
        email: '',
        name: '',
      });
    },
    setInitialPath({ commit }, path) {
      commit('SET_INITIAL_PATH', path);
    },
    updateUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
};

export default new Vuex.Store(base);
