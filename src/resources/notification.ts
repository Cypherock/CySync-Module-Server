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

export function getAllLatest(lastId?: string) {
  let queryString = '?';
  if (lastId) {
    const query = new URLSearchParams();
    query.append('lastId', lastId);
    queryString += query.toString();
  }

  return http.get(`${baseURL}/latest${queryString}`);
}
