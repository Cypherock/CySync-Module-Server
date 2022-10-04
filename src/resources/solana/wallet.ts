import http from '../../utils/http';

const baseURL = '/solana/wallet';

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
    key: `SWB-${params.network}-${params.address}`,
    ttl: 10,
    isRefresh
  });
}
