import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageHeading: '',
    user: {
      email: '',
      name: ''
    }
  },
  mutations: {
    SET_PAGE_HEADING(state, text) {
      state.pageHeading = text;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  }
});