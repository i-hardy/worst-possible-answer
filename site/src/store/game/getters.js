export const getPlayerHasPlayed = state =>
  !!state.round.cardsPlayed.length;

export const getClientIsCzar = (state, getters, rootState) =>
  state.round.czar === rootState.player.id;

export const getRoundWinner = state =>
  state.players.find(player => player.id === state.round.winner);
