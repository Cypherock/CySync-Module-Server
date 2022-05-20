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
