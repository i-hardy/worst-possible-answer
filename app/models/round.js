class Round {
  constructor(callCard, players) {
    this.callCard = callCard;
    this.players = players;
    this.playedResponses = [];
  }
  cardsPerResponse() {
    return this.callCard.text.length - 1;
  }
  playResponse(card) {
    this.playedResponses.push(card);
  }
  isReady() {
    return this.playedResponses.length === this.players.length;
  }
}

module.exports = Round;
