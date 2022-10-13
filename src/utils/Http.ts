import { apiHost } from 'config/app';

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
  data?: Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class Http {
  public static baseUrl = apiHost;

  static get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    const { data } = options;
    return this._send<T>(data ? `${url}&${queryStringify(data)}` : url, { ...options, method: Method.GET });
  }

  static put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this._send(url, { ...options, method: Method.PUT });
  }

  static post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this._send<T>(url, { ...options, method: Method.POST });
  }

  static patch<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this._send<T>(url, { ...options, method: Method.PATCH });
  }

  static delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this._send<T>(url, { ...options, method: Method.DELETE });
  }

  private static _send<T>(url: string, options: Options = { method: Method.GET }): Promise<T> {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      let xhrTimeout: number | undefined;
      const xhr = new XMLHttpRequest();

      xhr.open(method, this.baseUrl + url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = function () {
        if (xhrTimeout) {
          clearTimeout(xhrTimeout);
        }
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (timeout) {
        xhrTimeout = setTimeout(xhr.abort, timeout);
      }

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
