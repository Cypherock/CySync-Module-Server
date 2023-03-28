import querystring from 'querystring';
import config from '../../config';
import http from '../../utils/http';

const baseURL = '/eth/transaction';

export function getHistory(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
    from?: number;
    limit?: number;
    responseType: 'v1' | 'v2';
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

export function getContractHistory(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
    from?: number;
    limit?: number;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/contract-history`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETCH-${params.network}-${params.address}-${params.contractAddress}`,
    ttl: 10,
    isRefresh
  });
}

export function broadcastTxn(params: { transaction: string; network: string }) {
  return http.post(`${baseURL}/broadcast`, params);
}

export function getFees(
  params: { network: string; responseType: 'v1' | 'v2' },
  isRefresh?: boolean
) {
  let url = `${baseURL}/fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETF-${params.responseType}-${params.network}`,
    ttl: 5,
    isRefresh
  });
}

export function getContractFees(
  params: {
    fromAddress: string;
    network: string;
    contractAddress: string;
    toAddress: string;
    amount: string;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/contract-fees`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETCF-${params.responseType}-${params.network}-${params.contractAddress}-${params.toAddress}-${params.fromAddress}-${params.amount}`,
    ttl: 5,
    isRefresh
  });
}

export function getEstimatedGas(
  params: {
    from: string;
    to: string;
    network: string;
    value: string;
    data?: string;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/estimate-gas`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETEG-${params.responseType}-${params.from}-${params.to}-${
      params.network
    }-${params.value}-${params.data?.slice(0, 10)}`, // function signature
    ttl: 5,
    isRefresh
  });
}

export function setHook(params: { receiveAddress: string }) {
  return http.post(`${baseURL}/set-hook`, params);
}

export function transactionStatus(
  params: { network: string; txHash: string },
  isRefresh?: boolean
) {
  let url = `${baseURL}/transaction-status`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `ETTS-${params.network}-${params.txHash}`,
    ttl: 5,
    isRefresh
  });
}

export function getOpenTxnLink(params: {
  network: string;
  txHash: string;
  isConfirmed: boolean;
}) {
  return `${config.BASE_URL}${baseURL}/open-txn?${querystring.stringify(
    params
  )}`;
}
