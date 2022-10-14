"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./MessageForm.scss");
const Component_1 = __importDefault(require("core/Component"));
const utils_1 = require("utils");
const FormValidator_1 = require("utils/FormValidator");
const types_1 = require("./../../../../components/Button/types");
class MessageForm extends Component_1.default {
    constructor() {
        super();
        const { message } = FormValidator_1.predefinedRules;
        this.form = new utils_1.Form({ message });
        this.setProps({
            onMessageBlur: () => this.form.validate('message'),
            events: {
                submit: this.onSubmit.bind(this),
            },
        });
    }
    componentDidMount() {
        // Set form refs after compontent has been mounted
        const { messageInput: message } = this.refs;
        this.form.setRefs({ message });
    }
    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        // eslint-disable-next-line no-console
        console.log('Submitted data', this.form.getValues());
        const validationResult = this.form.validate();
        // eslint-disable-next-line no-console
        console.log('Validation result', validationResult);
        if (!this.form.hasErrors) {
            // eslint-disable-next-line no-console
            console.log('Validation passed. Submitting form....');
        }
    }
    render() {
        //template=hbs
        return `
      <form class='message-form'>
        <div class='message-form__attachments-button'>
            {{#Button type='button' style='icon'}}
                <i class='icon message-form__attachments-button-icon'></i>
            {{/Button}}
        </div>
        <div class='message-form__input-container'>
            {{{FormGroup class='message-form__input' name='message'
                placeholder='Сообщение...' textarea=true
                onBlur=onMessageBlur ref='messageInput'
            }}}
        </div>
        <div class='message-form__send-button'>
            {{#Button style='${types_1.ButtonStyle.ICON}' classes='btn_primary'}}
              <i class="icon message-form__send-button-icon"></i>
            {{/Button}}
        </div>
      </form>
    `;
    }
}
exports.default = MessageForm;
MessageForm.componentName = 'MessageForm';
//# sourceMappingURL=MessageForm.js.map