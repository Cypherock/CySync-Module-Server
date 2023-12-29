import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/firmware-stm';

export function getLatest(params: { prerelease: boolean }) {
  const query: any = {
    channel: params.prerelease ? 'prerelease-legacy' : 'legacy'
  };

  return http.get(`${baseURL}/latest?${querystring.stringify(query)}`);
}

export function getInitial(params: { prerelease: boolean }) {
  const query: any = {
    channel: params.prerelease ? 'prerelease-legacy' : 'legacy'
  };

  return http.get(`${baseURL}/initial?${querystring.stringify(query)}`);
}
