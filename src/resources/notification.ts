import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/notification';

export function get(lastId?: string, items?: number, order?: 'a' | 'd') {
  const query: any = {};
  if (lastId !== undefined) {
    query.lastId = lastId;
  }

  if (items !== undefined) {
    query.items = items;
  }

  if (order !== undefined) {
    query.order = order;
  }

  return http.get(`${baseURL}?${querystring.stringify(query)}`);
}
