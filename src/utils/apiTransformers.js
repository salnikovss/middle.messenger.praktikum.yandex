"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUser = void 0;
const transformUser = (data) => {
    return {
        id: data.id,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
    };
};
exports.transformUser = transformUser;
//# sourceMappingURL=apiTransformers.js.map