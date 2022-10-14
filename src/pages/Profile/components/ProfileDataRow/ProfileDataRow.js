"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("core/Component"));
class ProfileFormRow extends Component_1.default {
    render() {
        // template=hbs
        return `
      <div class='data__rows-row'>
        {{#if label}}
          <span class='data__row-param'>{{label}}</span>
        {{/if}}
        {{#if text}}
          <span class='data__row-value'>{{text}}</span>
        {{/if}}
      </div>
    `;
    }
}
exports.default = ProfileFormRow;
ProfileFormRow.componentName = 'ProfileDataRow';
//# sourceMappingURL=ProfileDataRow.js.map