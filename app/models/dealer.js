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
    return this.calls.shift();
  }
  pickResponse() {
    return this.responses.shift();
  }
}

module.exports = Dealer;
