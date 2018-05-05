const Game = require('../models/game');
const uuidv4 = require('uuid/v4');

describe('Game', () => {
  const uuid = uuidv4();
  let testGame;

  beforeEach(() => {
    testGame = new Game(uuid);
  });

  describe('initialisation', () => {
    it('initialises with the passed id', () => {
      expect(testGame.id).to.equal(uuid);
    });

    it('has an empty array of decks', () => {
      expect(testGame.decks).to.deep.equal([]);
    });

    it('has an empty array of players', () => {
      expect(testGame.players).to.deep.equal([]);
    });
  });

  describe('#addDeck', () => {
    it('adds the passed deck object to the decks array', () => {
      const deck = { code: 'deckDeck', calls: [], responses: [] };
      testGame.addDeck(deck);
      expect(testGame.decks).to.include(deck);
    });
  });

  describe('#removeDeck', () => {
    it('removes the deck object with the passed code', () => {
      const deck = { code: 'badDeck' };
      testGame.addDeck(deck);
      testGame.removeDeck('badDeck');
      expect(testGame.decks).not.to.include(deck);
    });
  });

  describe('#addPlayer', () => {
    it('adds the passed player to the players array', () => {
      const player = { id: 'jimbob' };
      testGame.addPlayer(player);
      expect(testGame.players).to.include(player);
    });
  });

  describe('#removePlayer', () => {
    it('removes the player with the passed id', () => {
      const player = { id: 'jimbob' };
      testGame.addPlayer(player);
      testGame.removePlayer('jimbob');
      expect(testGame.players).not.to.include(player);
    });
  });

  describe('#allCalls', () => {
    let call1;
    let call2;
    let deck;

    beforeEach(() => {
      call1 = {};
      call2 = {};
      deck = { calls: [call1, call2] };
      testGame.addDeck(deck);
    });

    it('returns all call cards in all decks', () => {
      expect(testGame.allCalls()).to.deep.equal([call1, call2]);
    });
  });

  describe('#allResponses', () => {
    let res1;
    let res2;
    let deck;

    beforeEach(() => {
      res1 = {};
      res2 = {};
      deck = { responses: [res1, res2] };
      testGame.addDeck(deck);
    });

    it('returns all call cards in all decks', () => {
      expect(testGame.allResponses()).to.deep.equal([res1, res2]);
    });
  });
});
