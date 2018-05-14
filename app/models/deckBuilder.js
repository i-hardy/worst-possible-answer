const cardcast = require('cardcast');

class DeckBuilder {
  constructor(fetcher = cardcast) {
    this.fetcher = fetcher;
  }
  getInfo(deckID) {
    return this.fetcher(deckID).info();
  }
  getCalls(deckID) {
    return this.fetcher(deckID).calls();
  }
  getResponses(deckID) {
    return this.fetcher(deckID).responses();
  }
  async buildDeck(deckID) {
    try {
      const info = this.getInfo(deckID);
      const calls = this.getCalls(deckID);
      const responses = this.getResponses(deckID);
      const { name, code, description } = await info;
      return {
        name,
        code,
        description,
        calls: await calls,
        responses: await responses,
      };
    } catch (error) {
      return null;
    }
  }
}

module.exports = DeckBuilder;
