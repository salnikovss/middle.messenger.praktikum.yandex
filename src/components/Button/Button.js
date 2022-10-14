"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Button.scss");
const Component_1 = __importDefault(require("core/Component"));
const types_1 = require("./types");
class Button extends Component_1.default {
    constructor(_a) {
        var { onClick } = _a, rest = __rest(_a, ["onClick"]);
        const defaultProps = {
            type: types_1.ButtonType.SUBMIT,
            style: types_1.ButtonStyle.PRIMARY,
        };
        super(Object.assign(Object.assign(Object.assign({}, defaultProps), rest), { events: { click: onClick } }));
    }
    render() {
        // language=hbs
        return `
      <button type='{{type}}' class='btn btn_{{style}} {{classes}}'>
        <template data-slot='1'></template>
      </button>
    `;
    }
}
exports.default = Button;
Button.componentName = 'Button';
//# sourceMappingURL=Button.js.map