import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gameID: '',
    player: {
      id: '',
      name: '',
      points: 0,
      isOwner: false,
    },
    game: {
      players: [],
    },
  },
  mutations,
});

export { store as default };
