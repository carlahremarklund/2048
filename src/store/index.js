import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    highscores: [],
    allTiles: {},
    playing: false,
    actions: -2,
    name: '',
  },
  mutations: {
    addToHighcore(state, payload) {
      state.highscores.push(payload);
      state.highscores = _.orderBy(state.highscores, 'score', ['desc']);
    },
    currentBoard(state, payload) {
      state.allTiles = payload;
      state.playing = true;
    },
    actions(state, payload) {
      state.actions = payload;
    },
    isPlaying(state, payload) {
      state.playing = payload;
    },
    setName(state, payload) {
      state.name = payload;
    },
  },
  getters: {},
  actions: {
  },
  modules: {
  },
});
