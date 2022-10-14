"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = __importDefault(require("./isObject"));
function isEqual(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for (const aKey in a) {
        const aV = a[aKey];
        const bV = b[aKey];
        if ((0, isObject_1.default)(aV) && (0, isObject_1.default)(bV)) {
            return isEqual(aV, bV);
        }
        else if (aV !== bV) {
            return false;
        }
    }
    return true;
}
exports.default = isEqual;
//# sourceMappingURL=isEqual.js.map