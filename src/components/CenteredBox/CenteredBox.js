"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./CenteredBox.scss");
const Component_1 = __importDefault(require("core/Component"));
class CenteredBox extends Component_1.default {
    render() {
        //template=hbs
        return `
      <div class='centered-box'>
          <div class='centered-box__inner'>
              {{#if title}}
                  <h1 class='centered-box__title'>{{title}}</h1>
              {{/if}}
              <div class='centered-box__content'>
                <template data-slot=1></template>
              </div>
          </div>
      </div>
    `;
    }
}
exports.default = CenteredBox;
CenteredBox.componentName = 'CenteredBox';
//# sourceMappingURL=CenteredBox.js.map