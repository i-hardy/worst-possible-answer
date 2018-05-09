const mockPlayer = {
  dealHand() {},
  deal() {},
};

const mockGame = {
  id: 'ABC',
  players: [mockPlayer],
  allCalls() { return []; },
  allResponses() { return []; },
};

const mockDealer = {
  shuffleCalls() {},
  shuffleResponses() {},
  pickCall() {},
  pickResponse() {},
};

const mockRoom = {
  emit() {},
};

const mockSocket = {
  emit() {},
};

const mockIo = {
  sockets: {
    in() {
      return mockRoom;
    },
  },
};

module.exports = {
  mockPlayer,
  mockGame,
  mockDealer,
  mockRoom,
  mockSocket,
  mockIo,
};
