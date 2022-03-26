import querystring from 'querystring';
import config from '../../config';
import http from '../../utils/http';

const baseURL = '/eth/transaction';

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
    ttl: 60,
    isRefresh
  });
}

export function getContractHistory(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/contract-history`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETCH-${params.network}-${params.address}-${params.contractAddress}`,
    ttl: 60,
    isRefresh
  });
}

export function broadcastTxn(params: { transaction: string; network: string }) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getFees(params: { network: string }, isRefresh?: boolean) {
  let url = `${baseURL}/fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETF-${params.network}`,
    ttl: 30,
    isRefresh
  });
}

export function getContractFees(
  params: {
    fromAddress: string;
    network: string;
    contractAddress: string;
    toAddress: string;
    amount: number;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/contract-fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETCF-${params.network}-${params.contractAddress}-${params.toAddress}-${params.fromAddress}-${params.amount}`,
    ttl: 30,
    isRefresh
  });
}

export function setHook(params: { receiveAddress: string }) {
  return http.post(`${baseURL}/set-hook`, params);
}

export function getOpenTxnLink(params: { network: string; txHash: string }) {
  return `${config.BASE_URL}${baseURL}/open-txn?${querystring.stringify(
    params
  )}`;
}
