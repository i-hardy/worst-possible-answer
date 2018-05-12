import Vue from 'vue';
import Vuex from 'vuex';
import game from './game';
import player from './player';
import messaging from './messaging';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    game,
    player,
    messaging,
  },
});

export { store as default };
