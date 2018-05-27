# Worst Possible Answer

An online Cards Against Humanity clone. Node back end using express and socket.io, Vue front end.

## Development

### API
In dev mode the server uses nodemon for hot reloading

```
git clone
cd worst-possible-answer
npm install
npm run dev
```
Game setup, including players joining and the game owner adding decks, is handled through REST endpoints under `/games`. Once the game is started, communication is handled through a socket.io room scoped with the game's unique ID.

### Front end
In dev mode the front end is run on a different server to separate webpack hot reloading.

```
git clone
cd worst-possible-answer/site
npm install
npm run dev
```
The front end is an SPA built largely with [Vuetify](https://vuetifyjs.com/en/). Websocket events are communicated directly to the Vuex store.