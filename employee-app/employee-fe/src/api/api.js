import axios from 'axios';
import { authToken } from '../main.js';

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

API.interceptors.request.use(config => {
  const token = authToken.value;
  if(token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default API;
