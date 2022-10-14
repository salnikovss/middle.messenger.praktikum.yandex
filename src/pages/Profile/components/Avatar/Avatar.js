"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Avatar.scss");
const Component_1 = __importDefault(require("core/Component"));
class Avatar extends Component_1.default {
    render() {
        //template=hbs
        return `
      <a href='#' class='avatar {{#if image}}avatar_filled{{/if}}'>
        <div class='avatar__inner' {{#if image}}style='background-image: url({{image}})'{{/if}}>
          <div class='avatar__hover'>Загрузить<br/>аватар</div>
        </div>
      </a>
    `;
    }
}
exports.default = Avatar;
Avatar.componentName = 'Avatar';
//# sourceMappingURL=Avatar.js.map