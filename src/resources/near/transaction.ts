import http from '../../utils/http';

const baseURL = '/near/transaction';

export function getHistory(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/history`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETH-${params.network}-${params.address}-${params.contractAddress}`,
    ttl: 10,
    isRefresh
  });
}

export function broadcastTxn(params: { transaction: string; network: string }) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getBlockHash(params: { network: string; }) {
  return http.post(`${baseURL}/blockhash`, params);
}

export function getOpenTxnLink(params: {
  network: string;
  txHash: string;
}) {
  return `${baseURL}/open-txn?${JSON.stringify(params)}`;
}

export function getFees(params: { network: string }, isRefresh?: boolean) {
  let url = `${baseURL}/fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETF-${params.network}`,
    ttl: 5,
    isRefresh
  });
}