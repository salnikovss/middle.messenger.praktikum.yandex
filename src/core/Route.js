"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderDOM_1 = __importDefault(require("./renderDOM"));
class Route {
    constructor(_pathname, _componentClass, _props, authRequired = false) {
        this._pathname = _pathname;
        this._componentClass = _componentClass;
        this._props = _props;
        this.authRequired = authRequired;
        this._component = null;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._component) {
            this._component.hide();
        }
    }
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        var _a;
        // if (!this._component) {
        this._component = new this._componentClass((_a = this._props.initialProps) !== null && _a !== void 0 ? _a : {});
        // } else {
        //   this._component.show();
        // }
        (0, renderDOM_1.default)(this._component, this._props.rootQuery);
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map