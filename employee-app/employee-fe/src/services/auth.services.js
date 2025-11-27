import API from '../api/api.js';

export async function login(email, password){
  return (await API.post('/auth/login', { email, password })).data;
}

export async function register(data){
  return (await API.post('/auth/register', data)).data;
}
