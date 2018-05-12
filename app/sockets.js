const socketio = require('socket.io');
const GameController = require('./models/gameController');

module.exports = (server) => {
  const io = socketio(server);
  GameController.receiveIo(io);

  function newPlayer(game, player, socket) {
    const gamePlayer = game.players.find(p => p.id === player.id);
    if (!gamePlayer.socket) {
      io.sockets.in(game.id).emit('new_player', JSON.stringify({
        players: game.players,
      }));
    }
    gamePlayer.receiveSocket(socket);
  }

  io.on('connection', (socket) => {
    let thisGame;
    let gameRoom;

    socket.on('room', ({ gameID, player }) => {
      thisGame = GameController.findGame(gameID);
      gameRoom = io.sockets.in(gameID);
      socket.join(gameID);
      if (!thisGame) return;
      newPlayer(thisGame, player, socket);
    });

    socket.on('game_start', () => {
      gameRoom.emit('startGame');
    });

    socket.on('chat_message', ({ player, content }) => {
      gameRoom.emit('chat_message', JSON.stringify({ player, content }));
    });

    socket.on('deck_added', ({ deckName }) => {
      const content = `Deck added: ${deckName}`;
      gameRoom.emit('chat_message', JSON.stringify({ content }));
    });

    socket.on('deck_removed', ({ deckName }) => {
      const content = `Deck removed: ${deckName}`;
      gameRoom.emit('chat_message', JSON.stringify({ content }));
    });

    socket.on('play_card', ({ playerID, cardID }) => {
      const playedCard = thisGame.allResponses().find(card => card.id === cardID);
      const { activeRound } = GameController.findEngine(thisGame);
      activeRound.playResponse({ playerID, playedCard });
    });
  });
};
