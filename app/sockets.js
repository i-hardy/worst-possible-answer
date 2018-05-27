const socketio = require('socket.io');
const GameController = require('./models/gameController');

module.exports = (server) => {
  const io = socketio(server);
  GameController.receiveIo(io);

  function newPlayer(game, player, socket) {
    const gamePlayer = game.players.find(p => p.id === player.id);
    if (!gamePlayer.socket) {
      io.sockets.in(game.id).emit('update_players', JSON.stringify({
        players: game.sanitizedPlayers(),
      }));
    }
    gamePlayer.receiveSocket(socket);
  }

  io.on('connection', (client) => {
    let thisGame;
    let game;

    client.on('room', async ({ gameID, player }) => {
      thisGame = GameController.findGame(gameID);
      game = gameID;
      await client.join(gameID);
      if (!thisGame) return;
      newPlayer(thisGame, player, client);
    });

    client.on('game_start', () => {
      io.sockets.in(game).emit('startGame');
    });

    client.on('chat_message', ({ player, content }) => {
      io.sockets.in(game).emit('chat_message', JSON.stringify({ player, content }));
    });

    client.on('deck_added', ({ deckName }) => {
      const content = `Deck added: ${deckName}`;
      io.sockets.in(game).emit('chat_message', JSON.stringify({ content }));
    });

    client.on('deck_removed', ({ deckName }) => {
      const content = `Deck removed: ${deckName}`;
      io.sockets.in(game).emit('chat_message', JSON.stringify({ content }));
    });

    client.on('play_card', ({ playerID, cardID }) => {
      const card = thisGame.allResponses().find(c => c.id === cardID);
      const { activeRound } = GameController.findEngine(thisGame);
      activeRound.playResponse({ playerID, card });
    });

    client.on('czar_pick', ({ playerID, cardID }) => {
      const gamePlayer = thisGame.players.find(p => p.id === playerID);
      const card = gamePlayer.play(cardID);
      const { activeRound } = GameController.findEngine(thisGame);
      activeRound.czarPick({ playerID, card });
    });
  });
};
