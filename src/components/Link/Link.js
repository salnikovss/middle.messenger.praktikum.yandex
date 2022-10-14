"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./link.scss");
const Component_1 = __importDefault(require("core/Component"));
class Link extends Component_1.default {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { events: {
                click: (e) => {
                    e.preventDefault();
                    window.router.go(this.props.to);
                    return false;
                },
            } }));
    }
    render() {
        //template=hbs
        return `<a class="{{class}}" href="{{to}}">{{{text}}}</a>`;
    }
}
exports.default = Link;
Link.componentName = 'Link';
//# sourceMappingURL=Link.js.map