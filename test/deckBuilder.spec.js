const DeckBuilder = require('../models/deckBuilder');

describe('DeckBuilder', () => {
  const mockCardcast = () => ({
    info() {
      return { name: 'fancy deck', code: 1, description: 'the fanciest deck' };
    },
    calls() {
      return ['hey', 'you'];
    },
    responses() {
      return ['whats', 'up'];
    },
  });
  let builder;

  beforeEach(() => {
    builder = new DeckBuilder(mockCardcast);
  });

  describe('#getInfo', () => {
    it('returns the info of the passed deckId', () => {
      expect(builder.getInfo(1)).to.deep.equal({ name: 'fancy deck', code: 1, description: 'the fanciest deck' });
    });
  });

  describe('#getCalls', () => {
    it('returns the calls for the passed deckId', () => {
      expect(builder.getCalls(1)).to.deep.equal(['hey', 'you']);
    });
  });

  describe('#getResponses', () => {
    it('returns the responses fo the passed deckId', () => {
      expect(builder.getResponses(1)).to.deep.equal(['whats', 'up']);
    });
  });

  describe('#buildDeck', () => {
    it('returns an object of all info for the passed deckId', (done) => {
      builder.buildDeck(1).then((result) => {
        expect(result).to.deep.equal({
          name: 'fancy deck',
          code: 1,
          description: 'the fanciest deck',
          calls: ['hey', 'you'],
          responses: ['whats', 'up'],
        });
        done();
      });
    });
  });
});
