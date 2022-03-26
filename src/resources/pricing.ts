import http from '../utils/http';

const baseURL = '/pricing';

export function get(params: { coin: string; days: number }) {
  return http.post(`${baseURL}`, params);
}
