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
    this.gameRoom.emit(messageName, JSON.stringify(packet));
  }
  winner() {
    return this.game.players
      .find(player => player.points === parseInt(this.game.winCondition));
  }
  notifyRoundOver(message, packet, cardsToDeal) {
    this.activeRound = null;
    if (!this.winner()) {
      this.sendToPlayers(message, packet);
      setTimeout(this.subsequentRound.bind(this, cardsToDeal),
        process.env.ROUND_GAP_TIMEOUT * 1000);
    } else {
      this.sendToPlayers('game_won', this.winner());
    }
  }
  firstRound() {
    this._passCardsToDealer();
    this._dealCards(5);
    this._createRound();
    this.activeRound.wait();
  }
  subsequentRound(cardsToDeal = 1) {
    this._dealCards(cardsToDeal);
    this._createRound();
    this.activeRound.wait();
  }
  _createRound() {
    const call = this.dealer.pickCall();
    this.activeRound = new this.RoundClass(call,
      this.game.players,
      this.notifyRoundOver.bind(this),
      this.sendToPlayers.bind(this));
    this.sendToPlayers('set_call_card', JSON.stringify(call));
    this.rounds.push(this.activeRound);
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
