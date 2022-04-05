import http from '../utils/http';

const baseURL = '/pricing';

export function get(params: { coin: string; days: number }) {
  return http.post(`${baseURL}`, params);
}

export function getLatest(params: { coin: string }) {
  return http.post(`${baseURL}/latest`, params);
}
