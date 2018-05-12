/* eslint no-param-reassign: 0 */

export const SET_GAME_ID = (state, id) => {
  state.gameID = id;
};

export const CLEAR_GAME = (state) => {
  state.players = [];
  state.chat = [];
};

export const SOCKET_CHAT_MESSAGE = (state, message) => {
  state.chat.push(JSON.parse(message));
};

export const SOCKET_UPDATE_PLAYERS = (state, payload) => {
  const { players } = JSON.parse(payload);
  state.players = players;
};

export const SOCKET_SET_CALL_CARD = (state, callCard) => {
  state.round.callCard = JSON.parse(callCard);
  state.round.cardsPlayed = [];
  state.round.isEnded = false;
  state.round.winner = null;
};

export const SOCKET_SET_CZAR = (state, czarId) => {
  state.round.czar = JSON.parse(czarId);
};

export const SOCKET_SEND_ALL_RESPONSES = (state, payload) => {
  const { responses } = JSON.parse(payload);
  state.round.cardsPlayed = responses;
};

export const SOCKET_SEND_ROUND_WINNER = (state, payload) => {
  const winner = JSON.parse(payload);
  state.round.winner = winner;
};

export const SOCKET_SEND_WINNER = (state, payload) => {
  const { winner } = JSON.parse(payload);
  const winningPlayer = state.players.find(player => player.id === winner);
  state.winner = winningPlayer;
};

export const SOCKET_SEND_NEW_ROUND = (state, payload) => {
  const { winner } = JSON.parse(payload);
  if (winner) {
    state.round.winner = winner;
  }
  state.round.isEnded = true;
};

export const PLAYER_PLAYED_CARD = (state, playedCard) => {
  state.round.cardsPlayed.push(playedCard);
};
