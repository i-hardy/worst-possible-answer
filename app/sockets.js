const socketio = require('socket.io');
const GameController = require('./models/gameController');

module.exports = (server) => {
  const io = socketio(server);
  GameController.receiveIo(io);

  function gameSockets(id) {
    return io.sockets.in(id);
  }

  function updatePlayers(game) {
    gameSockets(game.id).emit('update_players', JSON.stringify({
      players: game.sanitizedPlayers(),
    }));
  }

  function newPlayer(game, player, socket) {
    const gamePlayer = game.players.find(p => p.id === player.id);
    updatePlayers(game);
    gamePlayer.receiveSocket(socket);
  }

  io.on('connection', (socket) => {
    let thisGame;
    let game;

    socket.on('room', ({ gameID, player }) => {
      thisGame = GameController.findGame(gameID);
      game = gameID;
      socket.join(gameID);
      if (!thisGame) return;
      newPlayer(thisGame, player, socket);
      console.log(`Player connected to game ${gameID}`);
    });

    socket.on('game_start', () => {
      gameSockets(game).emit('startGame');
    });

    socket.on('chat_message', ({ player, content }) => {
      gameSockets(game).emit('chat_message', JSON.stringify({ player, content }));
    });

    socket.on('deck_added', ({ deckName }) => {
      const content = `Deck added: ${deckName}`;
      gameSockets(game).emit('chat_message', JSON.stringify({ content }));
    });

    socket.on('deck_removed', ({ deckName }) => {
      const content = `Deck removed: ${deckName}`;
      gameSockets(game).emit('chat_message', JSON.stringify({ content }));
    });

    socket.on('play_card', ({ playerID, cards }) => {
      const gamePlayer = thisGame.players.find(p => p.id === playerID);
      gamePlayer.play(cards);
      const { activeRound } = GameController.findEngine(thisGame);
      activeRound.playResponse({ playerID, cards });
    });

    socket.on('czar_pick', ({ playerID }) => {
      const { activeRound } = GameController.findEngine(thisGame);
      activeRound.czarPick({ playerID });
    });

    socket.on('disconnect', () => {
      if (thisGame) {
        const disconnecter = thisGame.players.find(p => p.socket === socket);
        thisGame.removePlayer(disconnecter.id);
        const engine = GameController.findEngine(thisGame);
        if (engine.activeRound) {
          engine.activeRound.playerLeft(disconnecter.id);
        }
        updatePlayers(thisGame);
      }
    });
  });
};
