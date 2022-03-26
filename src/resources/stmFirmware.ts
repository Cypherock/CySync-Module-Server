import http from '../utils/http';

const baseURL = '/firmware-stm';

export function getLatest() {
  return http.get(`${baseURL}/latest`);
}

export function getInitial() {
  return http.get(`${baseURL}/initial`);
}
