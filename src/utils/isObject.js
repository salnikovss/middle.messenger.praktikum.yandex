"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    return (typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]');
}
exports.default = isObject;
//# sourceMappingURL=isObject.js.map