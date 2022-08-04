import http from '../utils/http';

const baseURL = '/pricing';
const coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3/coins';

export function get(
  params: { coin: string; days: number },
  newApi: boolean = false
) {
  if (newApi) {
    return http.get(
      `/${params.coin}/market_chart?vs_currency=usd&days=${params.days}`,
      undefined,
      undefined,
      coinGeckoBaseUrl
    );
  } else return http.post(`${baseURL}`, params);
}

export function getLatest(params: { coin: string }) {
  return http.post(`${baseURL}/latest`, params);
}
