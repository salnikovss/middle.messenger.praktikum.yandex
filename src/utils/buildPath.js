"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPath = void 0;
function buildPath(...args) {
    return args
        .map((part, i) => {
        if (i === 0) {
            return part.trim().replace(/[/]*$/g, '');
        }
        else {
            return part.trim().replace(/(^[/]*|[/]*$)/g, '');
        }
    })
        .filter((x) => x.length)
        .join('/');
}
exports.buildPath = buildPath;
//# sourceMappingURL=buildPath.js.map