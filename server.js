const debug = require('debug')('cah-clone:server');
const http = require('http');
const app = require('./app/app');
const port = normalizePort(process.env.PORT || '3000');
const GameController = require('./app/models/gameController');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  let thisGame;

  socket.on('room', function({ gameID, player }) {
    thisGame = GameController.findGame(gameID);
    console.log(thisGame);
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

  socket.on('chat_message', function({ player, content }) {
    io.sockets.in(thisGame.id).emit('chat_message', JSON.stringify({ player, content }));
  });
});


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
