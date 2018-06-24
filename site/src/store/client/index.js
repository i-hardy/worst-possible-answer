import * as mutations from './mutations';

const messaging = {
  state: {
    nudgeMessage: {
      show: false,
      content: '',
    },
    toastMessage: {
      show: false,
      content: '',
    },
    showSidebar: true,
  },
  mutations,
};

export { messaging as default };
