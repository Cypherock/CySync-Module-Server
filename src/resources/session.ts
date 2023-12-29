import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/session';

export function createSession(params: { deviceSerial: string }) {
  return http.get(`${baseURL}?${querystring.stringify(params)}`);
}