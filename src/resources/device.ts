import http from '../utils/http';

const baseURL = '/verification';

export function verify(params: {
  serial: string;
  signature: string;
  message?: string;
  postfix1?: string;
  postfix2?: string;
}) {
  return http.post(`${baseURL}/verify`, params);
}

export function challenge(params: {
  serial: string;
  signature: string;
  challenge: string;
  firmwareVersion: string;
  postfix1?: string;
  postfix2?: string;
  isTestApp?: boolean;
  email?: string;
  cysyncVersion?: string;
  onlyFailure?: boolean;
  sessionId?: string;
}) {
  return http.post(`${baseURL}/challenge`, params);
}
