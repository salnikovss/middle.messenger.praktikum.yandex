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
const Component_1 = __importDefault(require("core/Component"));
class ProfileFormRow extends Component_1.default {
    constructor(_a) {
        var { onFocus } = _a, rest = __rest(_a, ["onFocus"]);
        super(Object.assign(Object.assign({}, rest), { onFocus: (evt) => {
                this.setError();
                if (onFocus) {
                    onFocus(evt);
                }
            } }));
    }
    setError(text = '') {
        this.refs.errorRef.setProps({ text });
    }
    render() {
        // template=hbs
        return `
      <div class='data__rows-row'>
        {{#if label}}
          <label for='field-{{name}}' class='data__row-param'>{{label}}</label>
        {{/if}}
        {{{Input
            name=name
            type=type
            class='data__row-form-control'
            style=style
            placeholder=placeholder
            value=value
            ref='inputRef'
            onBlur=onBlur
            onFocus=onFocus
        }}}
        {{{Error text=error ref='errorRef'}}}
      </div>
    `;
    }
}
exports.default = ProfileFormRow;
ProfileFormRow.componentName = 'ProfileFormRow';
//# sourceMappingURL=ProfileFormRow.js.map