"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Modal.scss");
const Component_1 = __importDefault(require("core/Component"));
class Modal extends Component_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        //template=hbs
        return `
      <div class='modal'>
        <div class="modal__content">
          {{#if title}}
            <div class="modal__head">
              <p class="modal__title">{{title}}</p>
            </div>
          {{/if}}
          <div class="modal__body">
              {{body}}
          </div>
        </div>
        <div class="modal__backdrop"></div>
      </div>
    `;
    }
}
exports.default = Modal;
Modal.componentName = 'Modal';
//# sourceMappingURL=Modal.js.map