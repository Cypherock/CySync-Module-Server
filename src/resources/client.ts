import { IRequestMetadata, Service } from '../utils/http';

export interface IClientResponse {
  status?: number;
  data?: any;
  isFailed: boolean;
  headers?: boolean;
  delay?: number;
}

export async function create(operations: IRequestMetadata[]) {
  const clientResponses: Record<number, IClientResponse> = {};
  let failAll = false;
  const rateLimitResponse = { status: 429, isFailed: true, delay: 120000 };
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];

    if (operation.customBaseUrl) {
      if (failAll) {
        clientResponses[i] = rateLimitResponse;
        continue;
      }
      try {
        const service = new Service(operation.customBaseUrl);
        let resp;
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
      } catch (error: any) {
        if (error.response?.status === 429) {
          failAll = true;
          clientResponses[i] = rateLimitResponse;
        }
      }
    }
  }

  const allResponses: IClientResponse[] = [];

  for (let i = 0; i < operations.length; i++) {
    if (clientResponses[i]) {
      allResponses.push(clientResponses[i]);
    }
  }

  return allResponses;
}
