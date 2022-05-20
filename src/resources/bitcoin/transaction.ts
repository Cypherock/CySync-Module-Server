import querystring from 'querystring';
import config from '../../config';
import http from '../../utils/http';

const baseURL = '/transaction';

export function getHistory(
  params: { walletName: string; coinType: string; limit?: number },
  isRefresh?: boolean
) {
  let url = `${baseURL}/history`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BTH-${params.coinType}-${params.walletName}-${params.limit}`,
    ttl: 60,
    isRefresh
  });
}

export function broadcastTxn(params: {
  transaction: string;
  coinType: string;
}) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getReceivePath() {
  return `${config.BASE_URL}${baseURL}/receive`;
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

export function setHook(params: { receiveAddress: string; coinType: string }) {
  return http.post(`${baseURL}/set-hook`, params);
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
    key: `BTHX-${params.coinType}`,
    ttl: 60,
    isRefresh: false
  });
}
