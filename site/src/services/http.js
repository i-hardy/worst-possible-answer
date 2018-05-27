import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/games' : '/games'

const http = axios.create({
  baseURL,
  timeout: 5000,
});

export { http as default };
