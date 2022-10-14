"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./BackButtonWrapper.scss");
const core_1 = require("core");
class BackButtonWrapper extends core_1.Component {
    render() {
        var _a;
        //template=hbs
        return `
      <div class='back-button-wrapper'>
        {{{Link
          text="<span class='back-button-wrapper__link-inner'></span>"
          to='${(_a = this.props.route) !== null && _a !== void 0 ? _a : '/'}'
          class='back-button-wrapper__link'
        }}}
        <div class='back-button-wrapper__content custom-scrollbar'>
          <div class='back-button-wrapper__content-inner'>
            <template data-slot=1></template>
          </div>
        </div>
      </div>
    `;
    }
}
exports.default = BackButtonWrapper;
BackButtonWrapper.componentName = 'BackButtonWrapper';
//# sourceMappingURL=BackButtonWrapper.js.map