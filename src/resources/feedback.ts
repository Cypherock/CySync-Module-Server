import http from '../utils/http';

const baseURL = '/feedback';

export function send(params: {
  subject: string;
  category: string;
  email: string;
  description: string;
  systemInfo?: any;
  deviceInfo?: any;
  deviceLogs?: any;
  desktopLogs?: any;
  attachmentUrls?: string[];
  uuid: any;
  appVersion: string;
}) {
  return http.post(`${baseURL}`, params);
}

export function crashReport(params: {
  subject: string;
  email?: string;
  description: string;
  systemInfo?: any;
  deviceInfo?: any;
  deviceLogs?: any;
  desktopLogs?: any;
  uuid: any;
  appVersion: string;
}) {
  if (!params.email) {
    delete params.email;
  }

  return http.post(`${baseURL}/crash`, params);
}

export function uploadAttachment(params: {
  attachment: Buffer;
  mimeType: string;
}) {
  return http.post(`${baseURL}/attachment`, params);
}
