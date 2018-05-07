import axios from 'axios';

const baseURL = 'http://localhost:3000/games';

const http = axios.create({
  baseURL,
  timeout: 5000,
});

export { http as default };
