import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import game from './game';
import player from './player';
import messaging from './messaging';

Vue.use(Vuex);

const persist = new VuexPersistence({
  storage: window.localStorage
});

const store = new Vuex.Store({
  modules: {
    game,
    player,
    messaging,
  },
  plugins: [persist.plugin],
});

export { store as default };
