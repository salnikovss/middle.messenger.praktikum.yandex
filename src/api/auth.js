"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAPI = void 0;
const Http_1 = __importDefault(require("utils/Http"));
exports.authAPI = {
    signin: (data) => Http_1.default.post('auth/signin', { data }),
    signup: (data) => Http_1.default.post('auth/signup', { data }),
    me: () => Http_1.default.get('auth/user'),
    logout: () => Http_1.default.post('auth/logout'),
};
//# sourceMappingURL=auth.js.map