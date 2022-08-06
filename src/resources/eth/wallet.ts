import http from '../../utils/http';

const baseURL = '/eth/wallet';

export function getBalance(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/balance`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `EWB-${params.responseType}-${params.network}-${params.address}-${params.contractAddress}`,
    ttl: 10,
    isRefresh
  });
}

export function getTxnCount(
  params: {
    address: string;
    network: string;
    contractAddress?: string;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/txn-count`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `EWTC-${params.responseType}-${params.network}-${params.address}-${params.contractAddress}`,
    ttl: 5,
    isRefresh
  });
}

export function getContractDecimal(
  params: {
    contractAddress: string;
    network: string;
    responseType: 'v1' | 'v2';
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/contract-decimal`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `EWTC-${params.responseType}-${params.network}-${params.contractAddress}`,
    ttl: 600,
    isRefresh
  });
}
