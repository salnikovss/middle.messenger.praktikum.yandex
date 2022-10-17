import { APIHOST } from 'config/app';

import { buildPath } from './buildPath';
import queryStringify from './queryStringify';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: Method;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type Response<T> = {
  response: T;
  status: number;
  responseHeaders: Record<string, unknown>;
};

export default class Http {
  public static baseUrl = APIHOST;

  static get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<Response<T>> {
    const { data } = options;
    return this._send<T>(data ? `${url}&${queryStringify(data as Record<string, unknown>)}` : url, {
      ...options,
      method: Method.GET,
    });
  }

  static put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<Response<T>> {
    return this._send(url, { ...options, method: Method.PUT });
  }

  static post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<Response<T>> {
    return this._send<T>(url, { ...options, method: Method.POST });
  }

  static patch<T>(url: string, options: OptionsWithoutMethod = {}): Promise<Response<T>> {
    return this._send<T>(url, { ...options, method: Method.PATCH });
  }

  static delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<Response<T>> {
    return this._send<T>(url, { ...options, method: Method.DELETE });
  }

  private static _send<T>(url: string, options: Options = { method: Method.GET }): Promise<Response<T>> {
    const { method, data, headers = { 'Content-Type': 'application/json' }, timeout } = options;

    return new Promise((resolve, reject) => {
      let xhrTimeout: number | undefined;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.open(method, buildPath(this.baseUrl, url));

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = function () {
        if (xhrTimeout) {
          clearTimeout(xhrTimeout);
        }

        let response = xhr.response;

        // Parse response headers
        const responseHeaders: Record<string, string> = {};
        xhr
          .getAllResponseHeaders()
          .trim()
          .split(/[\r\n]+/)
          .forEach((line) => {
            const parts = line.split(': ');
            const header = parts.shift() as string;
            const value = parts.join(': ');
            responseHeaders[header] = value;
          });

        if (response.length > 0 && responseHeaders['content-type'].includes('application/json')) {
          response = JSON.parse(response);
        }

        resolve({
          response,
          status: xhr.status,
          responseHeaders,
        });
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (timeout) {
        xhrTimeout = setTimeout(xhr.abort, timeout);
      }

      if (method === Method.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
