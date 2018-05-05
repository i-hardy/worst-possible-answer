class Round {
  constructor(callCard, playerCount) {
    this.callCard = callCard;
    this.playerCount = playerCount;
    this.playedResponses = [];
  }
  playResponse(card) {
    this.playedResponses.push(card);
  }
  isReady() {
    return this.playedResponses.length === this.playerCount;
  }
}

module.exports = Round;
