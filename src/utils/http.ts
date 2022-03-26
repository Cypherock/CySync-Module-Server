import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import mcache from './cache';
import envConfig from '../config';

export interface CacheOptions {
  key: string;
  ttl: number;
  isRefresh?: boolean;
}

class Service {
  public static setCacheKey(cacheOptions: CacheOptions, data: any) {
    mcache.set(cacheOptions.key, data, cacheOptions.ttl);
  }

  public static getCacheKey(cacheKey: string, isRefresh?: boolean) {
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

  public async get(
    url: string,
    cacheOptions?: CacheOptions,
    config?: AxiosRequestConfig
  ): Promise<any> {
    if (cacheOptions) {
      const cacheData = Service.getCacheKey(
        cacheOptions.key,
        cacheOptions.isRefresh
      );
      if (cacheData) {
        return cacheData;
      }
    }

    const res = await this.api.get(url, config);

    if (cacheOptions) {
      Service.setCacheKey(
        {
          key: cacheOptions.key,
          ttl: cacheOptions.ttl
        },
        res.data
      );
    }

    return res;
  }

  public async post(
    url: string,
    data: any,
    cacheOptions?: CacheOptions,
    config?: AxiosRequestConfig
  ): Promise<any> {
    if (cacheOptions) {
      const cacheData = Service.getCacheKey(
        cacheOptions.key,
        cacheOptions.isRefresh
      );
      if (cacheData) {
        return cacheData;
      }
    }

    const res = await this.api.post(url, data, config);

    if (cacheOptions) {
      Service.setCacheKey(
        {
          key: cacheOptions.key,
          ttl: cacheOptions.ttl
        },
        res.data
      );
    }

    return res;
  }

  public async delete(url: string): Promise<any> {
    return await this.api.delete(url);
  }
}

const http = new Service(envConfig.BASE_URL);

export default http;
