/* eslint no-param-reassign: 0 */

export const SET_GAME_ID = (state, id) => {
  state.gameID = id;
};

export const SET_PLAYER = (state, {
  playerID,
  name,
  icon,
  isOwner,
}) => {
  state.player.id = playerID;
  Object.assign(state.player, { name, icon, isOwner });
};

export const CLEAR_GAME = (state) => {
  state.game = {
    players: [],
    chat: [],
  };
};

export const SOCKET_CHAT_MESSAGE = (state, payload) => {
  state.game.chat.push(JSON.parse(payload));
};

export const SOCKET_NEW_PLAYER = (state, payload) => {
  const { players } = JSON.parse(payload);
  state.game.players = players;
};
