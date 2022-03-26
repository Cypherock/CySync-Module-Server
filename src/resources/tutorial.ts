import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/tutorial';

export function getAll(version: string) {
  const query: any = { version };

  return http.get(`${baseURL}?${querystring.stringify(query)}`);
}

export function getOne(version: string, type: number) {
  const query: any = { version, type };

  return http.get(`${baseURL}?${querystring.stringify(query)}`);
}
