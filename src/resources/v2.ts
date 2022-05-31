import http from '../utils/http';

const baseURL = '/v2';

export function getTransaction(
  params: {
    xpub: string;
    coinType: string;
    page: number;
    limit?: number;
    from?: number;
    to?: string;
  },
  isRefresh?: boolean
) {
  let url = `${baseURL}/transaction`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BB-TX-${params.xpub}-${params.coinType}-${params.page}-${params.from}-${params.to}`,
    ttl: 10,
    isRefresh
  });
}

export function getBalance(
  params: { xpub: string; coinType: string },
  isRefresh?: boolean
) {
  let url = `${baseURL}/balance`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BB-BAL-${params.xpub}-${params.coinType}`,
    ttl: 10,
    isRefresh
  });
}

export function getUtxo(
  params: { xpub: string; coinType: string },
  isRefresh?: boolean
) {
  let url = `${baseURL}/utxo`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BB-UTX-${params.xpub}-${params.coinType}`,
    ttl: 5,
    isRefresh
  });
}

export function getUsedAddresses(
  params: { xpub: string; coinType: string },
  isRefresh?: boolean
) {
  let url = `${baseURL}/used-addresses`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BB-UADR-${params.xpub}-${params.coinType}`,
    ttl: 10,
    isRefresh
  });
}
