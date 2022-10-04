import config from '../../config';
import querystring from 'querystring';
import http from '../../utils/http';

const baseURL = '/solana/transaction';

export function getHistory(
  params: {
    address: string;
    network: string;
    limit?: number;
    from?: number;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/history`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `SOLANA-${params.network}-${params.address}-${params.limit}-${params.from}}`,
    ttl: 10,
    isRefresh
  });
}

export function broadcastTxn(params: { transaction: string; network: string }) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getBlockHash(params: { network: string }) {
  return http.post(`${baseURL}/blockhash`, params);
}

export function getOpenTxnLink(params: { network: string; txHash: string }) {
  return `${config.BASE_URL}${baseURL}/open-txn?${querystring.stringify(
    params
  )}`;
}

export function getFees(params: { network: string }, isRefresh?: boolean) {
  let url = `${baseURL}/fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `STF-${params.network}`,
    ttl: 5,
    isRefresh
  });
}
