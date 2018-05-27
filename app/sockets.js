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
    let gameRoom;

    client.on('room', ({ gameID, player }) => {
      thisGame = GameController.findGame(gameID);
      gameRoom = io.sockets.in(gameID);
      client.join(gameID);
      if (!thisGame) return;
      newPlayer(thisGame, player, client);
    });

    client.on('game_start', () => {
      console.log(thisGame.id);
      console.log(gameRoom);
      gameRoom.emit('startGame');
    });

    client.on('chat_message', ({ player, content }) => {
      console.log(thisGame.id);
      console.log(gameRoom);
      gameRoom.emit('chat_message', JSON.stringify({ player, content }));
    });

    client.on('deck_added', ({ deckName }) => {
      const content = `Deck added: ${deckName}`;
      gameRoom.emit('chat_message', JSON.stringify({ content }));
    });

    client.on('deck_removed', ({ deckName }) => {
      const content = `Deck removed: ${deckName}`;
      gameRoom.emit('chat_message', JSON.stringify({ content }));
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
