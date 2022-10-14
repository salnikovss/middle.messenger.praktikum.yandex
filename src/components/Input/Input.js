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
require("./Input.scss");
const Component_1 = __importDefault(require("core/Component"));
const types_1 = require("./types");
class Input extends Component_1.default {
    constructor(_a) {
        var { onInput, onBlur, onFocus } = _a, rest = __rest(_a, ["onInput", "onBlur", "onFocus"]);
        super(Object.assign(Object.assign({}, rest), { type: rest.type || types_1.InputType.TEXT, value: rest.value || '', events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
            } }));
    }
    render() {
        //template=hbs
        return `
      <input
        class='{{#if class}}{{class}}{{else}}input{{/if}} {{#if style}}input_{{style}}{{/if}}'
        type='{{type}}'
        id='field-{{name}}'
        name='{{name}}'
        value='{{value}}'
        {{#if placeholder}}placeholder='{{placeholder}}'{{/if}}
      />
    `;
    }
}
exports.default = Input;
Input.componentName = 'Input';
//# sourceMappingURL=Input.js.map