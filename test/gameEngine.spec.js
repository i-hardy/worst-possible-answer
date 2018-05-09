const sinon = require('sinon');
const {
  mockPlayer,
  mockGame,
  mockRoom,
  mockIo,
  mockDealer,
} = require('./mocks.js');
const GameEngine = require('../app/models/gameEngine');

describe('Game Engine', () => {
  let testEngine;
  let sandbox;
  let RoundConstructor;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    RoundConstructor = sandbox.stub();
    testEngine = new GameEngine(mockGame, mockIo, mockDealer, RoundConstructor);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('initialisation', () => {
    it('accepts a game and a socket.io instance', () => {
      expect(testEngine.io).to.equal(mockIo);
      expect(testEngine.game).to.equal(mockGame);
    });

    it('locates the room associated with the game ID', () => {
      expect(testEngine.gameRoom).to.equal(mockRoom);
    });
  });

  describe('#sendToPlayers', () => {
    it('emits the passed message and packet to the game room', () => {
      const emitSpy = sandbox.spy(mockRoom, 'emit');
      testEngine.sendToPlayers('game_start', { callCard: 'beep' });
      expect(emitSpy).calledWithMatch('game_start', { callCard: 'beep' });
    });
  });

  describe('#firstRound', () => {
    it('passes calls and responses to the dealer', () => {
      const callSpy = sandbox.spy(mockDealer, 'shuffleCalls');
      const resSpy = sandbox.spy(mockDealer, 'shuffleResponses');
      testEngine.firstRound();
      expect(callSpy).calledOnce;
      expect(resSpy).calledOnce;
    });

    it('deals five cards to each player', () => {
      const pickSpy = sandbox.stub(mockDealer, 'pickResponse').returns('card');
      const dealSpy = sandbox.stub(mockPlayer, 'deal');
      testEngine.firstRound();
      expect(pickSpy.callCount).to.equal(5);
      expect(dealSpy).calledWith('card');
    });

    it('instantiates a round', () => {
      testEngine.firstRound();
      sinon.assert.calledWithNew(RoundConstructor);
    });
  });
});
