"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./ErrorPage.scss");
const routes_1 = require("config/routes");
const Component_1 = __importDefault(require("core/Component"));
const errorCodesText = {
    404: 'Страница не найдена',
    500: 'Что-то пошло не так',
};
class ErrorPage extends Component_1.default {
    constructor(props) {
        var _a, _b;
        props.code = (_a = props.code) !== null && _a !== void 0 ? _a : 404;
        super(Object.assign(Object.assign({}, props), { text: (_b = errorCodesText[props.code]) !== null && _b !== void 0 ? _b : '' }));
    }
    render() {
        //template=hbs
        return `
      <div class='error-box'>
        <div class='error-box__inner'>{{test}}
          <p class='error-box__code'>{{code}}</p>
          <p class='error-box__text'>{{text}}</p>
          {{{Link text='Перейти на главную' class='error-box__link' to='${routes_1.routeConsts.HOME}'}}}
        </div>
      </div>
    `;
    }
}
exports.default = ErrorPage;
ErrorPage.componentName = 'ErrorPage';
//# sourceMappingURL=ErrorPage.js.map