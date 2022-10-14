"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const auth_1 = require("api/auth");
const utils_1 = require("utils");
async function initApp(dispatch) {
    try {
        const response = await auth_1.authAPI.me();
        if ((0, utils_1.apiHasError)(response)) {
            return;
        }
        dispatch({ user: (0, utils_1.transformUser)(response) });
    }
    catch (err) {
        console.error(err);
    }
    finally {
        dispatch({ appIsInitiated: true });
    }
}
exports.initApp = initApp;
//# sourceMappingURL=initApp.js.map