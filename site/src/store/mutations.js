/* eslint no-param-reassign: 0 */

export const SET_GAME_ID = (state, id) => {
  state.gameID = id;
};

export const SET_PLAYER = (state, { playerID, name, isOwner }) => {
  state.player.id = playerID;
  Object.assign(state.player, { name, isOwner });
};
