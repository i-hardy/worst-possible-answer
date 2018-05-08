const Game = require('../models/game');
const Player = require('../models/player');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const icons = require('../models/iconlist');

const GameController = {
  games: [],
  generateGameId() {
    return (Math.random() * Date.now()).toString(36).substring(0, 8).toUpperCase();
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
    const id = this.generateGameId();
    this.games.push(new Game(id));
    return id;
  },
  findGame(id) {
    return this.games.find(game => game.id === id);
  },
  newPlayer(name, isOwner = false) {
    const icon = icons[Math.floor(Math.random()*icons.length)]
    const id = uuidv4();
    return new Player({ id, name, icon, isOwner });
  },
};

module.exports = GameController;
