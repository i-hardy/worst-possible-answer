import * as mutations from './mutations';
import * as getters from './getters';

const game = {
  state: {
    gameID: '',
    players: [],
    chat: [],
    round: {
      czar: '',
      callCard: {},
      cardsPlayed: [],
      isEnded: false,
      winner: null,
    },
    winner: null,
  },
  mutations,
  getters,
};

export { game as default };
