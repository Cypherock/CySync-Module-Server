import http, { IRequestMetadata, Service } from '../utils/http';

const baseURL = '/batch';

export interface IBatchResponse {
  status?: number;
  data?: any;
  isFailed: boolean;
  headers?: boolean;
}

export async function create(operations: IRequestMetadata[]) {
  const cachedResponses: Record<number, IBatchResponse> = {};
  const clientResponses: Record<number, IBatchResponse> = {};
  const serverResponsesIndex: Record<number, number> = {};
  const requestOperations: Array<{
    path: string;
    method: string;
    body?: any;
    headers?: any;
  }> = [];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];

    if (operation.cacheOptions) {
      const resp = Service.getCacheData(
        operation.cacheOptions.key,
        operation.cacheOptions.isRefresh
      );

      if (resp) {
        cachedResponses[i] = { data: resp.data, isFailed: false };
      }
    }

    if (operation.customBaseUrl) {
      const service = new Service(operation.customBaseUrl);
      let resp = undefined;
      switch (operation.method) {
        case 'GET':
          resp = await service
            .get(operation.path, operation.cacheOptions)
            .request();
          break;
        case 'POST':
          resp = await service
            .post(operation.path, operation.body, operation.cacheOptions)
            .request();
          break;
      }
      clientResponses[i] = resp;
    }

    if (!cachedResponses[i] && !clientResponses[i]) {
      serverResponsesIndex[i] = Object.keys(serverResponsesIndex).length;
      requestOperations.push({
        path: operation.path,
        method: operation.method,
        body: operation.body,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  let batchResponses: any[] = [];
  if (requestOperations.length > 0) {
    const resp = await http
      .post(baseURL, { operations: requestOperations })
      .request();

    batchResponses = resp.data;
  }

  const allResponses: IBatchResponse[] = [];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    if (cachedResponses[i]) {
      allResponses.push(cachedResponses[i]);
      continue;
    }

    if (clientResponses[i]) {
      allResponses.push(clientResponses[i]);
      continue;
    }

    if (
      serverResponsesIndex[i] === undefined ||
      !batchResponses[serverResponsesIndex[i]]
    ) {
      throw new Error('Cannot find the server response');
    }

    const data = batchResponses[serverResponsesIndex[i]];
    allResponses.push(data);

    if (operation.cacheOptions && data?.data && !data.isFailed) {
      Service.setCacheData(operation.cacheOptions, data.data);
    }
  }

  return allResponses;
}
