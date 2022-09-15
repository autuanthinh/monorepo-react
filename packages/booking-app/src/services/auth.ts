import API from '@app/utils/api';

export function signUp(payload: { username: string; password: string }) {
  let url = '/auth/createUser';
  return API.post(url, payload, null, false);
}

export function login(payload: { username: string; password: string }) {
  let url = '/auth/login';
  return API.post(url, payload, null, false).then(result => result.data);
}

export function refreshToken(token: string) {
  let url = '/auth/refresh-token';
  return API.post(url, { token }, null, false).then(result => result.data);
}
