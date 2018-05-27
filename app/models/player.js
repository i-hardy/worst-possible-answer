class Player {
  constructor({
    id,
    name,
    icon,
    isOwner = false,
  }) {
    Object.assign(this, {
      id,
      name,
      icon,
      isOwner,
    });
    this.points = 0;
    this.hand = [];
  }
  addPoint() {
    this.points += 1;
  }
  sendHand() {
    const payload = JSON.stringify({ hand: this.hand });
    this.socket.emit('send_hand', payload);
  }
  play(cardID) {
    const card = this.hand.find(c => c.id === cardID);
    this.hand.splice(this.hand.indexOf(card), 1);
    this.sendHand();
    return card;
  }
  deal(card) {
    this.hand.push(card);
    this.sendHand();
  }
  receiveSocket(socket) {
    this.socket = socket;
  }
  notify(message) {
    this.socket.emit('send_nudge', message);
  }
  dealHand(cards) {
    cards.forEach((card) => {
      this.deal(card);
    });
  }
}

module.exports = Player;
