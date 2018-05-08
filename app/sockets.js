const socketio = require('socket.io');
const GameController = require('./models/gameController');

module.exports = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    let thisGame;
    let game;
    
    socket.on('room', ({ gameID, player }) => {
      thisGame = GameController.findGame(gameID);
      game = gameID;
      socket.join(gameID);
      if (!thisGame) return;
      const gamePlayer = thisGame.players.find(p => p.id === player.id);
      if (!gamePlayer.joined) {
        io.sockets.in(gameID).emit('new_player', JSON.stringify({
          players: thisGame.players,
        }));
      }
      gamePlayer.joined = true;
    });
  
    socket.on('chat_message', ({ player, content }) => {
      io.sockets.in(game).emit('chat_message', JSON.stringify({ player, content }));
    });

    socket.on('deck_added', ({ ownerName, deckName }) => {
      const content = `Deck added: ${deckName}`;
      io.sockets.in(game).emit('chat_message', JSON.stringify({ content }));
    });
  });
}
