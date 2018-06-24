import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import game from './game';
import player from './player';
import client from './client';

Vue.use(Vuex);

const persist = new VuexPersistence({
  storage: window.localStorage,
  key: 'wpa-persisted',
});

const store = new Vuex.Store({
  modules: {
    game,
    player,
    client,
  },
  plugins: [persist.plugin],
});

export { store as default };
