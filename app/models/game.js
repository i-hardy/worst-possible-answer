const moment = require('moment');

class Game {
  constructor(id) {
    this.id = id;
    this.isRunning = false;
    this.decks = [];
    this.players = [];
    this.chat = [];
    this.startedAt = moment();
  }
  addDeck(deck) {
    if (this.decks.some(currDeck => currDeck.code === deck.code)) {
      throw new Error('Deck already added');
    }
    this.decks.push(deck);
  }
  removeDeck(deckCode) {
    this.decks = this.decks.filter(deck => deck.code !== deckCode);
  }
  addPlayer(player) {
    if (this.players.some(currPlayer => currPlayer.id === player.id)) {
      throw new Error('Player already joined');
    }
    this.players.push(player);
  }
  removePlayer(playerID) {
    this.players = this.players.filter(player => player.id !== playerID);
  }
  sanitizedPlayers() {
    return this.players.map((player) => {
      const {
        id,
        name,
        icon,
        isOwner,
        points,
      } = player;
      return {
        id,
        name,
        icon,
        isOwner,
        points,
      };
    });
  }
  allCalls() {
    const calls = [];
    this.decks.forEach((deck) => {
      deck.calls.forEach((call) => {
        calls.push(call);
      });
    });
    return calls;
  }
  allResponses() {
    const responses = [];
    this.decks.forEach((deck) => {
      deck.responses.forEach((response) => {
        responses.push(response);
      });
    });
    return responses;
  }
  setWinCondition(condition) {
    this.winCondition = condition;
  }
  run() {
    this.isRunning = true;
  }
}

module.exports = Game;
