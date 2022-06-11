import http from '../../utils/http';

const baseURL = '/near/wallet';

export function getBalance(
  params: {
    address: string;
    network: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/balance`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `NWB-${params.network}-${params.address}`,
    ttl: 10,
    isRefresh
  });
}

export function getKeys(
  params: {
    address: string;
    network: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/keys`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `NWK-${params.network}-${params.address}`,
    ttl: 10,
    isRefresh
  });
}

export function getAccounts(
  params: {
    address: string;
    network: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/keys`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `NWA-${params.network}-${params.address}`,
    ttl: 10,
    isRefresh
  });
}

export function getBlockHash(
  params: {
    network: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/get`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `NWA-${params.network}`,
    ttl: 10,
    isRefresh
  });
}