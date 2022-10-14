"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTime(date) {
    try {
        const dateObj = new Date(date);
        return [dateObj.getHours(), dateObj.getMinutes()].join(':');
    }
    catch (_a) {
        return '';
    }
}
exports.default = getTime;
//# sourceMappingURL=getTime.js.map