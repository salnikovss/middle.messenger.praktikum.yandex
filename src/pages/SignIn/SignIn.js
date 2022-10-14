"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("components/Input");
const routes_1 = require("config/routes");
const Component_1 = __importDefault(require("core/Component"));
const utils_1 = require("utils");
const predefinedRules_1 = require("../../utils/FormValidator/predefinedRules");
class SignIn extends Component_1.default {
    constructor() {
        super();
        const { login, password } = predefinedRules_1.predefinedRules;
        this.form = new utils_1.Form({ login, password });
        this.setProps({
            onLoginBlur: () => this.form.validate('login'),
            onPasswordBlur: () => this.form.validate('password'),
            events: {
                submit: this.onSubmit.bind(this),
            },
        });
    }
    componentDidMount() {
        // Set form refs after compontent has been mounted
        const { loginInput: login, passwordInput: password } = this.refs;
        this.form.setRefs({ login, password });
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
      {{#CenteredBox title='Авторизация'}}
        <form method='post'>
            {{{FormGroup label='Имя пользователя' name='login'
                ref='loginInput' onBlur=onLoginBlur}}}

            {{{FormGroup label='Пароль' name='password' type='${Input_1.InputType.PASSWORD}'
                onBlur=onPasswordBlur ref='passwordInput'}}}

            {{#Button}}Войти{{/Button}}
        </form>
        {{{Link to='${routes_1.routeConsts.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
    }
}
exports.default = SignIn;
SignIn.componentName = 'SignIn';
//# sourceMappingURL=SignIn.js.map