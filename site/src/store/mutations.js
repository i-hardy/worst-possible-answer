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

export const SOCKET_SEND_HAND = (state, payload) => {
  const { hand } = JSON.parse(payload);
  state.hand = hand;
};

export const SOCKET_SEND_NUDGE = (state, payload) => {
  state.nudgeMessage.content = payload;
  state.nudgeMessage.show = true;
};

export const SOCKET_SET_CALL_CARD = (state, payload) => {
  state.game.callCard = JSON.parse(payload);
};

export const SOCKET_SEND_WINNER = (state) => {
  
};
