class Player {
  constructor({ id, name, isOwner = false }) {
    Object.assign(this, { id, name, isOwner });
    this.points = 0;
    this.hand = [];
  }
  addPoint() {
    this.points += 1;
  }
  deal(card) {
    this.hand.push(card);
  }
  dealHand(cards) {
    cards.forEach((card) => {
      this.deal(card);
    });
  }
}

module.exports = Player;
