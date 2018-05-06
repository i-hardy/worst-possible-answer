const GameController = require('../models/gameController');
const Game = require('../models/game');
const Player = require('../models/player');

describe('GameController', () => {
  beforeEach(() => {
    GameController.games = [];
  });

  describe('#gameSetup', () => {
    it('creates a game with an owner player with the passed name', () => {
      GameController.gameSetup('carey');
      expect(GameController.games[0].players[0].name).to.equal('carey');
    });
  });

  describe('#newGame', () => {
    it('creates an instance of the game class and adds it to the games array', () => {
      GameController.newGame();
      expect(GameController.games[0]).to.be.an.instanceOf(Game);
    });

    it('returns the id of the new game', () => {
      expect(GameController.newGame()).to.be.a('string');
    });
  });

  describe('#findGame', () => {
    it('returns the game with the passed id', () => {
      GameController.newGame();
      GameController.newGame();
      const { id } = GameController.games[0];
      expect(GameController.findGame(id)).to.equal(GameController.games[0]);
    });
  });

  describe('#newPlayer', () => {
    it('returns a new Player with the passed name', () => {
      expect(GameController.newPlayer('taako')).to.be.an.instanceOf(Player);
    });
  });

  describe('#addPlayerToGame', () => {
    it('adds a new player with the passed name to the game with the passed id', () => {
      const id = GameController.newGame();
      GameController.addPlayerToGame(id, 'merle');
      expect(GameController.findGame(id).players[0].name).to.equal('merle');
    });
  });
});
