"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Error.scss");
const Component_1 = __importDefault(require("core/Component"));
class Error extends Component_1.default {
    render() {
        //template=hbs
        return `<p class='error'>{{#if text}}{{text}}{{/if}}</p>`;
    }
}
exports.default = Error;
Error.componentName = 'Error';
//# sourceMappingURL=Error.js.map