import axios from 'axios';

const baseURL = process.env.GAMES_ENDPOINT || 'http://localhost:3000/games';

const http = axios.create({
  baseURL,
  timeout: 5000,
});

export { http as default };
