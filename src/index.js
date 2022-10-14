"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const BackButtonWrapper_1 = __importDefault(require("components/BackButtonWrapper"));
const CenteredBox_1 = __importDefault(require("components/CenteredBox"));
const Error_1 = __importDefault(require("components/Error"));
const Input_1 = __importDefault(require("components/Input"));
const Textarea_1 = __importDefault(require("components/Textarea"));
const routes_1 = require("config/routes");
const Router_1 = __importDefault(require("core/Router"));
const Chat_1 = __importDefault(require("pages/Chat"));
const ErrorPage_1 = __importDefault(require("pages/ErrorPage"));
const Profile_1 = __importDefault(require("pages/Profile"));
const PasswordChange_1 = __importDefault(require("pages/Profile/modules/PasswordChange"));
const ProfileEdit_1 = __importDefault(require("pages/Profile/modules/ProfileEdit"));
const SignIn_1 = __importDefault(require("pages/SignIn"));
const SignUp_1 = __importDefault(require("pages/SignUp"));
const initApp_1 = require("services/initApp");
const Button_1 = __importDefault(require("./components/Button"));
const FormGroup_1 = __importDefault(require("./components/FormGroup"));
const Link_1 = __importDefault(require("./components/Link"));
const core_1 = require("./core");
const store_1 = require("./store");
function registerComponents() {
    (0, core_1.registerComponent)(Link_1.default);
    (0, core_1.registerComponent)(Textarea_1.default);
    (0, core_1.registerComponent)(Input_1.default);
    (0, core_1.registerComponent)(Error_1.default);
    (0, core_1.registerComponent)(FormGroup_1.default);
    (0, core_1.registerComponent)(Button_1.default);
    (0, core_1.registerComponent)(CenteredBox_1.default);
    (0, core_1.registerComponent)(BackButtonWrapper_1.default);
}
document.addEventListener('DOMContentLoaded', () => {
    const store = new core_1.Store(store_1.defaultState);
    registerComponents();
    window.router = new Router_1.default('#app');
    window.store = store;
    window.router
        .use(routes_1.routeConsts.HOME, Chat_1.default)
        .use(routes_1.routeConsts.CHAT, Chat_1.default)
        .use(routes_1.routeConsts.PROFILE, Profile_1.default)
        .use(routes_1.routeConsts.PROFILE_EDIT, ProfileEdit_1.default)
        .use(routes_1.routeConsts.PROFILE_PASSWORD_CHANGE, PasswordChange_1.default)
        .use(routes_1.routeConsts.SIGNIN, SignIn_1.default)
        .use(routes_1.routeConsts.SIGNUP, SignUp_1.default)
        .use(routes_1.routeConsts.ERROR404, ErrorPage_1.default, { code: 404 })
        .use(routes_1.routeConsts.ERROR500, ErrorPage_1.default, { code: 500 })
        .start();
    store.dispatch(initApp_1.initApp);
});
//# sourceMappingURL=index.js.map