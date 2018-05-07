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
    toPick.isDealt = true;
    return toPick;
  }
  pickResponse() {
    const toPick = this.responses.find(card => !card.isDealt);
    toPick.isDealt = true;
    return toPick;
  }
}

module.exports = Dealer;
