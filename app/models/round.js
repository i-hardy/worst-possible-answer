const timings = require('./timings');

class Round {
  constructor(callCard, czar, players, doneFunction, sendFunction) {
    Object.assign(this, {
      callCard,
      czar,
      players,
      doneFunction,
      sendFunction,
    });
    // Players who join during a round will not be counted until the next round
    this.roundPlayers = [].concat(players);
    this.playedResponses = [];
    this.pollCount = 0;
    this.nudged = false;
  }
  playerLeft(id) {
    this.players = this.players.filter(player => player.id !== id);
  }
  nonCzarPlayers() {
    return this.roundPlayers.filter(player => player.id !== this.czar.id);
  }
  roundJoiners() {
    return this.players.filter(player => !this.roundPlayers.includes(player));
  }
  cardsPerResponse() {
    return this.callCard.text.length - 1;
  }
  isReady() {
    return this.playedResponses.length === this.nonCzarPlayers().length;
  }
  playResponse(response) {
    this.playedResponses.push(response);
  }
  pendingPlayers() {
    const { playedResponses } = this;
    return this.nonCzarPlayers()
      .filter(player => !playedResponses.some(response => response.playerID === player.id));
  }
  wait(pollTime = timings.first) {
    this.pollInterval = setInterval(this
      .checkIsReady.bind(this, pollTime), 1000);
  }
  checkIsReady(pollTime) {
    if (this.isReady()) {
      clearInterval(this.pollInterval);
      this.czarTime();
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
    return this.nonCzarPlayers().filter(player => !this.pendingPlayers().includes(player));
  }
  czarTime() {
    this.pollCount = 0;
    this.sendFunction('send_all_responses', { responses: this.playedResponses });
    this.czarInterval = setInterval(this.checkForCzar.bind(this), 1000);
  }
  checkForCzar() {
    if (this.winningResponse) {
      this.roundHadWinner();
    } else if (this.pollCount === timings.first) {
      this.czarTimedOut();
    }
    this.pollCount += 1;
  }
  czarPick(response) {
    this.winningResponse = this.playedResponses
      .find(res => res.playerID === response.playerID);
  }
  roundHadWinner() {
    clearInterval(this.czarInterval);
    const winner = this.roundPlayers
      .find(player => player.id === this.winningResponse.playerID);
    winner.addPoint();
    this.sendRoundEnd({ winner: winner.id });
  }
  czarTimedOut() {
    clearInterval(this.czarInterval);
    this.sendFunction('chat_message', { content: 'The card czar fell asleep' });
    this.sendRoundEnd({});
  }
  sendRoundEnd(packet) {
    this.doneFunction(
      'send_new_round',
      packet,
      this.cardsPerResponse(),
      this.playersWhoPlayed(),
      this.roundJoiners(),
    );
  }
}

module.exports = Round;
