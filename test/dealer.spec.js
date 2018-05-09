const Dealer = require('../app/models/dealer');

describe('Dealer', () => {
  let testDealer;

  beforeEach(() => {
    testDealer = new Dealer();
  });

  describe('shuffleCalls', () => {
    it('shuffles the passed calls and assigns them to a property', () => {
      const card1 = { id: 1 };
      const calls = [card1, { id: 2 }];
      testDealer.shuffleCalls(calls);
      expect(testDealer.calls).to.include(card1);
      expect(testDealer.calls).not.to.equal(calls);
    });
  });

  describe('#shuffleResponses', () => {
    it('shuffles the passed responses and assigns them to a property', () => {
      const card1 = { id: 1 };
      const responses = [card1, { id: 2 }];
      testDealer.shuffleResponses(responses);
      expect(testDealer.responses).to.include(card1);
      expect(testDealer.responses).not.to.equal(responses);
    });
  });

  describe('#pickCall', () => {
    it('returns the first non-dealt card from the shuffled calls array and marks it as dealt', () => {
      const calls = [{ id: 1, isDealt: true }, { id: 2 }];
      testDealer.shuffleCalls(calls);
      const pickedCard = testDealer.pickCall();
      expect(pickedCard).to.equal(calls[1]);
      expect(pickedCard.isDealt).to.be.true;
    });
  });

  describe('#pickResponse', () => {
    it('returns the first non-dealt card from the shuffled responses array and marks it as dealt', () => {
      const responses = [{ id: 1, isDealt: true }, { id: 2 }];
      testDealer.shuffleResponses(responses);
      const pickedCard = testDealer.pickResponse();
      expect(pickedCard).to.equal(responses[1]);
      expect(pickedCard.isDealt).to.be.true;
    });
  });
});
