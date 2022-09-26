enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data should be an object');
  }

  const params = Object.entries(data).map(([k, v]) => k + '=' + (v && typeof v === 'object' ? v.toString() : v));
  return params.join('&');
}

export class HTTP {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.send(url, { ...options, method: METHOD.GET });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.send(url, { ...options, method: METHOD.PUT });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.send(url, { ...options, method: METHOD.POST });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.send(url, { ...options, method: METHOD.DELETE });
  }

  send(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      let xhrTimeout: number | undefined;
      const xhr = new XMLHttpRequest();

      xhr.open(method, method === METHOD.GET && !!data ? `${url}&${queryStringify(data)}` : url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = function () {
        if (xhrTimeout) {
          clearTimeout(xhrTimeout);
        }
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (timeout) {
        xhrTimeout = setTimeout(xhr.abort, timeout);
      }

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
