const timings = require('./timings');

class PlayerRound {
  constructor(callCard, czar, players, doneFunction, sendFunction) {
    Object.assign(this, {
      callCard,
      czar,
      players,
      doneFunction,
      sendFunction,
    });
    this.playedResponses = [];
    this.pollCount = 0;
    this.nudged = false;
  }
  cardsPerResponse() {
    return this.callCard.text.length - 1;
  }
  isReady() {
    return this.playedResponses.length === this.players.length;
  }
  playResponse(response) {
    this.playedResponses.push(response);
  }
  pendingPlayers() {
    const { playedResponses } = this;
    return this.players()
      .filter(player => !playedResponses.some(response => response.playerID === player.id));
  }
  wait(pollTime = timings.first) {
    this.pollInterval = setInterval(this
      .checkIsReady.bind(this, pollTime), 1000);
  }
  checkIsReady(pollTime) {
    if (this.isReady()) {
      clearInterval(this.pollInterval);
    } else if (this.pollCount === pollTime) {
      clearInterval(this.pollInterval);
      this.handleIdlePlayers();
    }
    this.pollCount += 1;
  }
  handleIdlePlayers() {
    if (!this.nudged) {
      this.nudgeIdlePlayers();
      this.pollCount = 0;
      this.wait(timings.second);
    } else {
      this.skipIdlePlayers();
    }
  }
  nudgeIdlePlayers() {
    this.pendingPlayers().forEach((player) => {
      player.notify('Time to play a card!');
    });
    this.nudged = true;
  }
  skipIdlePlayers() {
    this.pendingPlayers().forEach((player) => {
      this.sendFunction('chat_message', { content: `${player.name} was idle too long :(` });
    });
    this.czarTime();
  }
  playersWhoPlayed() {
    return this.players.filter(player => !this.pendingPlayers().includes(player));
  }
}

module.exports = PlayerRound;
