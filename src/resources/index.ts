import config from '../config';

export * as firmware from './firmware';
export * as stmFirmware from './stmFirmware';
export * as device from './device';
export * as pricing from './pricing';
export * as eth from './eth';
export * as bitcoin from './bitcoin';
export * as near from './near';
export * as solana from './solana';
export * as notification from './notification';
export * as tutorial from './tutorial';
export * as feedback from './feedback';
export * as v2 from './v2';
export * as serverBatch from './serverBatch';
export * as clientBatch from './clientBatch';
export * as swap from './swap';

export const getServerUrl = () => {
  return config.BASE_URL;
};
