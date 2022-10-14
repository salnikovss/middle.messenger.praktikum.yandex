"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data should be an object');
    }
    const params = Object.entries(data).map(([k, v]) => k + '=' + (v && typeof v === 'object' ? v.toString() : v));
    return params.join('&');
}
exports.default = queryStringify;
//# sourceMappingURL=queryStringify.js.map