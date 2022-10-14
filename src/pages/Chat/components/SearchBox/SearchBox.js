"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("core/Component"));
class SearchBox extends Component_1.default {
    render() {
        //template=hbs
        return `
      <div class='search-box'>
          {{{FormGroup name='search' placeholder='Поиск' style='lighter' }}}
      </div>
    `;
    }
}
exports.default = SearchBox;
SearchBox.componentName = 'SearchBox';
//# sourceMappingURL=SearchBox.js.map