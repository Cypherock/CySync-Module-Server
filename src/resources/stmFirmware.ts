import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/firmware-stm';

export function getLatest(params: { prerelease: boolean }) {
  return http.get(`${baseURL}/latest?${querystring.stringify(params)}`);
}

export function getInitial(params: { prerelease: boolean }) {
  return http.get(`${baseURL}/initial?${querystring.stringify(params)}`);
}
