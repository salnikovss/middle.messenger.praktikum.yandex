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
require("./Textarea.scss");
const Component_1 = __importDefault(require("core/Component"));
class Textarea extends Component_1.default {
    constructor(_a) {
        var { onInput, onBlur, onFocus } = _a, rest = __rest(_a, ["onInput", "onBlur", "onFocus"]);
        super(Object.assign(Object.assign({}, rest), { value: rest.value || '', events: {
                focus: onFocus,
                blur: onBlur,
                input: onInput,
            } }));
    }
    render() {
        //template=hbs
        return `
      <textarea class='textarea {{class}}' name='{{name}}'
          id='field-{{name}}' {{#if placeholder}}placeholder='{{placeholder}}'{{/if}}
      >{{value}}</textarea>
    `;
    }
}
exports.default = Textarea;
Textarea.componentName = 'Textarea';
//# sourceMappingURL=Textarea.js.map