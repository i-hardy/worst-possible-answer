const randomatic = require('randomatic');
const uuidv4 = require('uuid/v4');

const Game = require('./game');
const GameEngine = require('./gameEngine');
const Player = require('./player');
const Dealer = require('./dealer');
const icons = require('./iconlist');

const GameController = {
  games: [],
  gameEngines: [],
  receiveIo(io) {
    this.io = io;
  },
  gameSetup(ownerName) {
    const id = this.newGame();
    const owner = this.newPlayer(ownerName, true);
    this.findGame(id).addPlayer(owner);
    return {
      id,
      owner: {
        name: ownerName,
        icon: owner.icon,
        playerID: owner.id,
      },
    };
  },
  addPlayerToGame(gameID, playerName) {
    const player = this.newPlayer(playerName);
    this.findGame(gameID).addPlayer(player);
    return {
      name: playerName,
      icon: player.icon,
      playerID: player.id,
    };
  },
  newGame() {
    const id = randomatic('A0', 8);
    this.games.push(new Game(id));
    return id;
  },
  findGame(id) {
    return this.games.find(game => game.id === id);
  },
  findEngine(game) {
    return this.gameEngines.find(engine => engine.game === game);
  },
  newPlayer(name, isOwner = false) {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const id = uuidv4();
    return new Player({
      id,
      name,
      icon,
      isOwner,
    });
  },
  startGame(game) {
    const dealer = new Dealer();
    const engine = new GameEngine(game, this.io, dealer);
    this.gameEngines.push(engine);
    game.run();
    engine.firstRound();
  },
};

module.exports = GameController;
