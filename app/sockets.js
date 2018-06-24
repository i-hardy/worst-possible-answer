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

  function handleClientRefresh(game, player) {
    const gamePlayer = game.disconnectedPlayers.find(p => p.id === player.id);
    if (gamePlayer) {
      game.restorePlayer(gamePlayer.id);
    }
    return gamePlayer;
  }

  function newPlayer(game, player, socket) {
    let gamePlayer = game.players.find(p => p.id === player.id);
    if (!gamePlayer) {
      gamePlayer = handleClientRefresh(game, player);
    }
    updatePlayers(game);
    if (!gamePlayer) return;
    gamePlayer.receiveSocket(socket);
  }

  function kickPlayer(game, playerID) {
    game.removePlayer(playerID);
    const engine = GameController.findEngine(game);
    if (engine && engine.activeRound) {
      engine.activeRound.playerLeft(playerID);
    }
    updatePlayers(game);
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

    socket.on('kick_player', (playerID) => {
      if (thisGame) {
        kickPlayer(thisGame, playerID);
      }
    });

    socket.on('disconnect', () => {
      if (!thisGame) return;
      const disconnecter = thisGame.players.find(p => p.socket === socket);
      if (disconnecter) {
        kickPlayer(thisGame, disconnecter.id);
      }
    });
  });
};
