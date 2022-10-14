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
require("./FormGroup.scss");
const Component_1 = __importDefault(require("core/Component"));
class FormGroup extends Component_1.default {
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
      <div class='form-group {{#if error}}form-group_has-error{{/if}}'>
        {{#if label}}
          <label for='field-{{name}}' class='form-group__label'>{{label}}</label>
        {{/if}}
        {{#if textarea}}
          {{{Textarea
              class=class
              name='message'
              placeholder=placeholder
              ref='inputRef'
              onInput=onInput
              onBlur=onBlur
              onFocus=onFocus
              value=value
          }}}
        {{else}}
          {{{Input
              name=name
              type=type
              class=class
              style=style
              placeholder=placeholder
              value=value
              ref='inputRef'
              onInput=onInput
              onBlur=onBlur
              onFocus=onFocus
          }}}
        {{/if}}
        {{{Error text=error ref='errorRef'}}}
      </div>
    `;
    }
}
exports.default = FormGroup;
FormGroup.componentName = 'FormGroup';
//# sourceMappingURL=FormGroup.js.map