import { IRequestMetadata, Service } from '../utils/http';

export interface IBatchResponse {
  status?: number;
  data?: any;
  isFailed: boolean;
  headers?: boolean;
}

export async function create(
  operations: IRequestMetadata[],
  timeout: { pause: boolean; tryAfter: number }
) {
  const clientResponses: Record<number, IBatchResponse> = {};
  console.log(timeout);
  console.log('client', operations.length);
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];

    if (operation.customBaseUrl) {
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
        console.log({ ...error });
        console.log(error.response);
      }
    }
  }

  const allResponses: IBatchResponse[] = [];

  for (let i = 0; i < operations.length; i++) {
    if (clientResponses[i]) {
      allResponses.push(clientResponses[i]);
    }
  }

  console.log('client', allResponses.length);
  return allResponses;
}
