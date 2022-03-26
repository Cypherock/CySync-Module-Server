import http from '../utils/http';

const baseURL = '/firmware';

export function getLatest() {
  return http.get(`${baseURL}/latest`);
}

export function getInitial() {
  return http.get(`${baseURL}/initial`);
}
