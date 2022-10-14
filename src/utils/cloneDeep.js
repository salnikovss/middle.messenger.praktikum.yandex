"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = __importDefault(require("./isObject"));
function cloneDeep(obj) {
    return (function _cloneDeep(item) {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== 'object') {
            return item;
        }
        // Handle:
        // * Date
        if (item instanceof Date) {
            return new Date(item.valueOf());
        }
        // Handle:
        // * Array
        if (item instanceof Array) {
            const copy = [];
            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));
            return copy;
        }
        // Handle:
        // * Set
        if (item instanceof Set) {
            const copy = new Set();
            item.forEach((v) => copy.add(_cloneDeep(v)));
            return copy;
        }
        // Handle:
        // * Map
        if (item instanceof Map) {
            const copy = new Map();
            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
            return copy;
        }
        // Handle:
        // * Object
        if ((0, isObject_1.default)(item)) {
            const copy = {};
            // Handle:
            // * Object.symbol
            Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));
            // Handle:
            // * Object.name (other)
            Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));
            return copy;
        }
        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}
exports.default = cloneDeep;
//# sourceMappingURL=cloneDeep.js.map