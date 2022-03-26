import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/notification';

export function get(lastId?: string, items?: number) {
  const query: any = {};
  if (lastId !== undefined) {
    query.lastId = lastId;
  }

  if (items !== undefined) {
    query.items = items;
  }

  return http.get(`${baseURL}?${querystring.stringify(query)}`);
}
