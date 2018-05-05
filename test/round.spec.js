const Round = require('../models/round');

describe('Round', () => {
  let card;
  let testRound;

  beforeEach(() => {
    card = {};
    testRound = new Round(card, 3);
  });

  describe('initialisation', () => {
    it('initialises with a call card object and a player count', () => {
      expect(testRound.callCard).to.equal(card);
      expect(testRound.playerCount).to.equal(3);
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

  describe('#isReady', () => {
    it('returns true when the number of responses played equals the player count', () => {
      /* eslint no-plusplus: 0 */
      for (let i = 0; i < 3; i++) {
        testRound.playResponse({});
      }
      expect(testRound.isReady()).to.be.true;
    });
  });
});
