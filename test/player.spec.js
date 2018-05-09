const { mockSocket } = require('./mocks');
const Player = require('../app/models/player');
const uuidv4 = require('uuid/v4');

describe('Player', () => {
  const id = uuidv4();
  let testPlayer;

  beforeEach(() => {
    testPlayer = new Player({ id, name: 'zelda', isOwner: true });
    testPlayer.receiveSocket(mockSocket);
  });

  describe('initialisation', () => {
    it('initialises with the passed id and name', () => {
      expect(testPlayer.id).to.equal(id);
      expect(testPlayer.name).to.equal('zelda');
    });

    it('has an isOwner boolean value', () => {
      expect(testPlayer.isOwner).to.be.true;
    });

    it('starts with no points', () => {
      expect(testPlayer.points).to.equal(0);
    });

    it('starts with an empty hand', () => {
      expect(testPlayer.hand).to.deep.equal([]);
    });
  });

  describe('#addPoint', () => {
    it('increases the players points', () => {
      testPlayer.addPoint();
      expect(testPlayer.points).to.equal(1);
    });
  });

  describe('#deal', () => {
    it('adds the passed card to the players hand', () => {
      const card = { id: 1 };
      testPlayer.deal(card);
      expect(testPlayer.hand).to.include(card);
    });
  });

  describe('#dealHand', () => {
    it('adds all passed cards to the hand', () => {
      const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
      testPlayer.dealHand(cards);
      expect(testPlayer.hand).to.deep.equal(cards);
    });
  });
});
