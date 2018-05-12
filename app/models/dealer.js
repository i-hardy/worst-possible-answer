const shuffle = require('shuffle-array');

class Dealer {
  constructor() {
    this.calls = [];
    this.responses = [];
  }
  shuffleCalls(calls) {
    this.calls = shuffle(calls, { copy: true });
  }
  shuffleResponses(responses) {
    this.responses = shuffle(responses, { copy: true });
  }
  pickCall() {
    const toPick = this.calls.find(card => !card.isDealt);
    try {
      toPick.isDealt = true;
      return toPick;
    } catch (error) {
      throw error;
    }
  }
  pickResponse() {
    const toPick = this.responses.find(card => !card.isDealt);
    try {
      toPick.isDealt = true;
      return toPick;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Dealer;
