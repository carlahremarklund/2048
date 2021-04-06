import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    highscores: [],
  },
  mutations: {
    addToHighcore(state, payload) {
      state.highscores.push(payload);
      state.highscores = _.orderBy(state.highscores, 'score', ['desc']);
    },
  },
  getters: {
    topScores: (state) => {
      return this._.orderBy(state.highscores, 'score');
    },
  },
  actions: {
  },
  modules: {
  },
});
