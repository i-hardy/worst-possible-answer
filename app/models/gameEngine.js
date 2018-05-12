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
      .find(player => player.points === parseInt(this.game.winCondition, 10));
  }
  notifyRoundOver(message, packet, cardsToDeal, playersToDealTo) {
    this.activeRound = null;
    this.sendToPlayers('update_players', { players: this.game.sanitizedPlayers() });
    if (!this.winner()) {
      this.sendToPlayers(message, packet);
      setTimeout(
        this.subsequentRound.bind(this, cardsToDeal, playersToDealTo),
        process.env.ROUND_GAP_TIMEOUT * 1000,
      );
    } else {
      this.sendToPlayers('send_winner', { winner: this.winner().id });
    }
  }
  pickCzar() {
    const { players } = this.game;
    if (!this.currentCzar) {
      const randomIndex = Math.floor(Math.random() * players.length);
      this.currentCzar = players[randomIndex];
    } else {
      const currIndex = players.indexOf(this.currentCzar);
      const czarIsLast = currIndex >= players.length - 1;
      this.currentCzar = czarIsLast ? players[0] : players[currIndex + 1];
    }
    this.sendToPlayers('set_czar', this.currentCzar.id);
  }
  firstRound() {
    this._passCardsToDealer();
    this._dealCards(5, this.game.players);
    this.pickCzar();
    this._createRound();
    this.activeRound.wait();
  }
  subsequentRound(cardsToDeal, playersToDealTo) {
    this._dealCards(cardsToDeal, playersToDealTo);
    this.pickCzar();
    this._createRound();
    this.activeRound.wait();
  }
  _createRound() {
    const call = this.dealer.pickCall();
    this.activeRound = new this.RoundClass(
      call,
      this.currentCzar,
      this.game.players,
      this.notifyRoundOver.bind(this),
      this.sendToPlayers.bind(this),
    );
    this.sendToPlayers('set_call_card', call);
    this.rounds.push(this.activeRound);
  }
  _passCardsToDealer() {
    const calls = this.game.allCalls();
    const responses = this.game.allResponses();
    this.dealer.shuffleCalls(calls);
    this.dealer.shuffleResponses(responses);
  }
  _dealCards(dealCount = 1, playersToDealTo = this.game.players) {
    playersToDealTo.forEach((player) => {
      for (let i = 0; i < dealCount; i++) {
        player.deal(this.dealer.pickResponse());
      }
    });
  }
}

module.exports = GameEngine;
