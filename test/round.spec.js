const Round = require('../app/models/round');

describe('Round', () => {
  let card;
  let players;
  let testRound;

  beforeEach(() => {
    card = {};
    players = [];
    testRound = new Round(card, players);
  });

  describe('initialisation', () => {
    it('initialises with a call card object and the passed player array', () => {
      expect(testRound.callCard).to.equal(card);
      expect(testRound.players).to.equal(players);
    });

    it('has an empty array of playedResponses', () => {
      expect(testRound.playedResponses).to.deep.equal([]);
    });
  });

  describe('#playResponse', () => {
    it('adds the passed card to the playedResponses array', () => {
      const resCard = { text: 'George Takei' };
      testRound.playResponse(resCard);
      expect(testRound.playedResponses).to.include(resCard);
    });
  });

  describe('#cardsPerResponse', () => {
    it('returns the number of spaces for responses that the call card has', () => {
      card.text = ['A witty statement from', 'and their friend said', '.'];
      expect(testRound.cardsPerResponse()).to.equal(2);
    });
  });

  describe('#pendingPlayers', () => {
    it('rewturns all players who have not yet responded', () => {
      testRound.players = [{ id: 1 }, { id: 2 }];
      testRound.playedResponses = [{ playerId: 1, card: {} }];
      expect(testRound.pendingPlayers()).to.deep.equal([{ id: 2 }]);
    });
  });

  describe('#isReady', () => {
    it('returns true when the number of responses played equals the player count', () => {
      testRound.players = [1, 2, 3];
      for (let i = 0; i < 3; i++) {
        testRound.playResponse({});
      }
      expect(testRound.isReady()).to.be.true;
    });
  });
});
