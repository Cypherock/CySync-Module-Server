import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import mcache from './cache';
import envConfig from '../config';

export interface ICacheOptions {
  key: string;
  ttl: number;
  isRefresh?: boolean;
}

export interface IRequestMetadata {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  cacheOptions?: ICacheOptions;
  customBaseUrl?: string;
}

export class Service {
  public static clearCacheData(cacheOptions: ICacheOptions) {
    mcache.del(cacheOptions.key);
  }

  public static setCacheData(cacheOptions: ICacheOptions, data: any) {
    mcache.set(cacheOptions.key, data, cacheOptions.ttl);
  }

  public static getCacheData(cacheKey: string, isRefresh?: boolean) {
    if (!isRefresh) {
      const cacheData = mcache.get(cacheKey);
      if (cacheData) {
        return { data: cacheData };
      }
    }

    return null;
  }

  public api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  public async _get(
    url: string,
    cacheOptions?: ICacheOptions,
    config?: AxiosRequestConfig
  ): Promise<any> {
    if (cacheOptions) {
      const cacheData = Service.getCacheData(
        cacheOptions.key,
        cacheOptions.isRefresh
      );
      if (cacheData) {
        return cacheData;
      }
    }

    const res = await this.api.get(url, config);

    if (cacheOptions) {
      Service.setCacheData(
        {
          key: cacheOptions.key,
          ttl: cacheOptions.ttl
        },
        res.data
      );
    }

    return res;
  }

  public get(
    url: string,
    cacheOptions?: ICacheOptions,
    config?: AxiosRequestConfig,
    customBaseUrl?: string
  ) {
    return {
      getMetadata: (): IRequestMetadata => ({
        path: url,
        method: 'GET',
        cacheOptions,
        customBaseUrl
      }),
      clearCache: () => {
        if (cacheOptions) {
          Service.clearCacheData(cacheOptions);
        }
      },
      request: () => {
        return this._get(url, cacheOptions, config);
      }
    };
  }

  public async _post(
    url: string,
    data: any,
    cacheOptions?: ICacheOptions,
    config?: AxiosRequestConfig
  ): Promise<any> {
    if (cacheOptions) {
      const cacheData = Service.getCacheData(
        cacheOptions.key,
        cacheOptions.isRefresh
      );
      if (cacheData) {
        return cacheData;
      }
    }

    const res = await this.api.post(url, data, config);

    if (cacheOptions) {
      Service.setCacheData(
        {
          key: cacheOptions.key,
          ttl: cacheOptions.ttl
        },
        res.data
      );
    }

    return res;
  }

  public post(
    url: string,
    data: any,
    cacheOptions?: ICacheOptions,
    config?: AxiosRequestConfig,
    customBaseUrl?: string
  ) {
    return {
      getMetadata: (): IRequestMetadata => ({
        path: url,
        body: data,
        method: 'POST',
        cacheOptions,
        customBaseUrl
      }),
      clearCache: () => {
        if (cacheOptions) {
          Service.clearCacheData(cacheOptions);
        }
      },
      request: () => {
        return this._post(url, data, cacheOptions, config);
      }
    };
  }

  public async _delete(url: string): Promise<any> {
    return await this.api.delete(url);
  }
}

const http = new Service(envConfig.BASE_URL);

export default http;

// async function run() {
//   const coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3';
//   const url = `/simple/price?ids=bitcoin&vs_currencies=usd`;

//   const coinGecko = new Service(coinGeckoBaseUrl);

//   let resp;
//   for (let i = 0; i < 60; i++) {
//     resp = await coinGecko.get(url).request();
//   }
//   console.log(resp);
// }

// try {
//   run();
// } catch (err: any) {
//   console.log(err);
//   console.log(err.response);
// }
