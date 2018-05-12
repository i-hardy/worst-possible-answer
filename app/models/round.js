const firstTimeout = parseInt(process.env.ROUND_FIRST_TIMEOUT, 10);
const secondTimeout = parseInt(process.env.ROUND_SECOND_TIMEOUT, 10);

class Round {
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
  nonCzarPlayers() {
    return this.players.filter(player => player.id !== this.czar.id);
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
    return this.players
      .filter(player => !playedResponses.some(response => response.playerID === player.id));
  }
  wait(pollTime = firstTimeout) {
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
      this.wait(secondTimeout);
    } else {
      this.skipIdlePlayers();
    }
  }
  nudgeIdlePlayers() {
    this.pendingPlayers().forEach((player) => {
      player.notify('play a card');
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
    } else if (this.pollCount === firstTimeout) {
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
    const winner = this.players
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
    );
  }
}

module.exports = Round;
