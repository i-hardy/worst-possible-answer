import * as mutations from './mutations';

const player = {
  state: {
    id: '',
    name: '',
    icon: '',
    points: 0,
    isOwner: false,
    hand: [],
  },
  mutations,
};

export { player as default };
