import querystring from 'querystring';
import http from '../utils/http';

const baseURL = '/swap';

export function createTransaction(params: {
  walletId: string;
  from: string;
  to: string;
  amount: string;
  address: string;
  serial: string;
}) {
  return http.get(`${baseURL}/transaction?${querystring.stringify(params)}`);
}

export function getExchangeRate(params: {
  from: string;
  to: string;
  amount: string;
}) {
  return http.get(
    `${baseURL}/exchangeDetails?${querystring.stringify(params)}`
  );
}

export function getTransactions(params: { walletId: string }) {
  return http.get(`${baseURL}/transactions?${querystring.stringify(params)}`);
}

export function verifyAddress(params: {
  serial: string;
  signature: string;
  postfix1: string;
  postfix2: string;
  address: string;
}) {
  return http.post(`${baseURL}/verify`, params);
}
