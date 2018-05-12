/* eslint no-param-reassign: 0 */

export const SET_PLAYER = (state, {
  playerID,
  name,
  icon,
  isOwner,
}) => {
  state.id = playerID;
  Object.assign(state, { name, icon, isOwner });
};

export const SOCKET_SEND_HAND = (state, payload) => {
  const { hand } = JSON.parse(payload);
  state.hand = hand;
};

export const CARD_PLAYED = (state, playedCard) => {
  state.hand = state.hand.filter(card => card.id !== playedCard.id);
};
