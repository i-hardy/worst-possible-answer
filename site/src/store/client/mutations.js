/* eslint no-param-reassign: 0 */

export const SOCKET_SEND_NUDGE = (state, message) => {
  state.nudgeMessage.content = message;
  state.nudgeMessage.show = true;
};

export const SEND_TOAST = (state, message) => {
  state.toastMessage.content = message;
  state.toastMessage.show = true;
};

export const TOGGLE_SIDEBAR = (state) => {
  state.showSidebar = !state.showSidebar;
};