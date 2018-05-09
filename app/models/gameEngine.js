const Round = require('./round');

class GameEngine {
  constructor(game, io, dealer, RoundClass = Round) {
    Object.assign(this, {
      game,
      io,
      dealer,
      RoundClass,
    });
    this.gameRoom = io.sockets.in(this.game.id);
    this.rounds = [];
  }
  sendToPlayers(messageName, packet) {
    this.gameRoom.emit(messageName, packet);
  }
  firstRound() {
    this._passCardsToDealer();
    this._dealCards(5);
    this._createRound();
  }
  _createRound() {
    const call = this.dealer.pickCall();
    this.activeRound = new this.RoundClass(call);
  }
  _passCardsToDealer() {
    const calls = this.game.allCalls();
    const responses = this.game.allResponses();
    this.dealer.shuffleCalls(calls);
    this.dealer.shuffleResponses(responses);
  }
  _dealCards(dealCount) {
    const { players } = this.game;
    players.forEach((player) => {
      for (let i = 0; i < dealCount; i++) {
        player.deal(this.dealer.pickResponse());
      }
    });
  }
}

module.exports = GameEngine;
