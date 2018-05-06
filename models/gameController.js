const Game = require('../models/game');
const Player = require('../models/player');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const GameController = {
  games: [],
  gameSetup(ownerName) {
    const id = this.newGame();
    const owner = this.newPlayer(ownerName, true);
    this.findGame(id).addPlayer(owner);
    return {
      id,
      owner: {
        name: ownerName,
        playerID: owner.id,
      },
    };
  },
  addPlayerToGame(gameID, playerName) {
    const player = this.newPlayer(playerName);
    this.findGame(gameID).addPlayer(player);
    return {
      name: playerName,
      playerID: player.id,
    };
  },
  newGame() {
    const id = uuidv4();
    this.games.push(new Game(id));
    return id;
  },
  findGame(id) {
    return this.games.find(game => game.id === id);
  },
  newPlayer(name, isOwner = false) {
    const id = uuidv1();
    return new Player({ id, name, isOwner });
  },
};

module.exports = GameController;
