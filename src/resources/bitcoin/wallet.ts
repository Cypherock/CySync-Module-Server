import http from '../../utils/http';

const baseURL = '/wallet';

export function addWallet(params: {
  walletName: string;
  coinType: string;
  addresses: string[];
}) {
  return http.post(`${baseURL}/add`, params);
}

export function addAddresses(params: {
  walletName: string;
  coinType: string;
  addresses: string[];
}) {
  return http.post(`${baseURL}/add-address`, params);
}

export function getUtxos(
  params: { walletName: string; coinType: string },
  isRefresh?: boolean
) {
  let url = `${baseURL}/fetch-utxos`;

  if (isRefresh) {
    url += '?isRefresh=true';
  }

  return http.post(url, params, {
    key: `BWU-${params.coinType}-${params.walletName}`,
    ttl: 60,
    isRefresh
  });
}
