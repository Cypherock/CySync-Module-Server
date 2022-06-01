import querystring from 'querystring';
import config from '../../config';
import http from '../../utils/http';

const baseURL = '/transaction';

export function broadcastTxn(params: {
  transaction: string;
  coinType: string;
}) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getFees(params: { coinType: string }, isRefresh?: boolean) {
  let url = `${baseURL}/fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BTF-${params.coinType}`,
    ttl: 60,
    isRefresh
  });
}

export function getOpenTxnLink(params: {
  coinType: string;
  txHash: string;
  isConfirmed: boolean;
}) {
  return `${config.BASE_URL}${baseURL}/open-txn?${querystring.stringify(
    params
  )}`;
}

export function getTxnHex(params: { hash: string; coinType: string }) {
  return http.post(`v2${baseURL}/hex`, params, {
    key: `BTHX-${params.coinType}-${params.hash}`,
    ttl: 60,
    isRefresh: false
  });
}
