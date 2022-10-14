"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("config/app");
const buildPath_1 = require("./buildPath");
const queryStringify_1 = __importDefault(require("./queryStringify"));
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["PATCH"] = "PATCH";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
class Http {
    static get(url, options = {}) {
        const { data } = options;
        return this._send(data ? `${url}&${(0, queryStringify_1.default)(data)}` : url, Object.assign(Object.assign({}, options), { method: Method.GET }));
    }
    static put(url, options = {}) {
        return this._send(url, Object.assign(Object.assign({}, options), { method: Method.PUT }));
    }
    static post(url, options = {}) {
        return this._send(url, Object.assign(Object.assign({}, options), { method: Method.POST }));
    }
    static patch(url, options = {}) {
        return this._send(url, Object.assign(Object.assign({}, options), { method: Method.PATCH }));
    }
    static delete(url, options = {}) {
        return this._send(url, Object.assign(Object.assign({}, options), { method: Method.DELETE }));
    }
    static _send(url, options = { method: Method.GET }) {
        const { method, data, headers, timeout } = options;
        return new Promise((resolve, reject) => {
            let xhrTimeout;
            const xhr = new XMLHttpRequest();
            xhr.open(method, (0, buildPath_1.buildPath)(this.baseUrl, url));
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
            }
            else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
exports.default = Http;
Http.baseUrl = app_1.apiHost;
//# sourceMappingURL=Http.js.map