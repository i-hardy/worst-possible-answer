/* eslint no-param-reassign: 0 */

export const SET_GAME_ID = (state, id) => {
  state.gameID = id;
};

export const CLEAR_GAME = (state) => {
  state.players = [];
  state.chat = [];
};

export const SOCKET_CHAT_MESSAGE = (state, payload) => {
  state.chat.push(JSON.parse(payload));
};

export const SOCKET_NEW_PLAYER = (state, payload) => {
  const { players } = JSON.parse(payload);
  state.players = players;
};

export const SOCKET_SET_CALL_CARD = (state, payload) => {
  state.round.callCard = JSON.parse(payload);
};

export const SOCKET_SEND_ROUND_WINNER = (state, payload) => {
  state.round = JSON.parse(payload);
};

export const SOCKET_NEW_ROUND = (state) => {
  state.round = {
    cardsPlayed: [],
    isEnded: false,
    winningResponse: null,
  };
};

export const PLAYER_PLAYED_CARD = (state, playedCard) => {
  state.round.cardsPlayed.push(playedCard);
};
