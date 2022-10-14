"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeDeep(lhs, rhs) {
    for (const p in rhs) {
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = mergeDeep(lhs[p], rhs[p]);
            }
            else {
                lhs[p] = rhs[p];
            }
        }
        catch (e) {
            lhs[p] = rhs[p];
        }
    }
    return lhs;
}
exports.default = mergeDeep;
//# sourceMappingURL=mergeDeep.js.map