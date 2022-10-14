"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("config/routes");
const Component_1 = __importDefault(require("core/Component"));
const utils_1 = require("utils");
const utils_2 = require("utils");
const FormValidator_1 = require("utils/FormValidator");
class SignUp extends Component_1.default {
    constructor(props) {
        super(props);
        const { first_name, second_name, login, email, password, phone } = FormValidator_1.predefinedRules;
        this.form = new utils_1.Form({ first_name, second_name, login, email, password, phone });
        this.setProps({
            onFirstNameBlur: () => this.form.validate('first_name'),
            onSecondNameBlur: () => this.form.validate('second_name'),
            onLoginBlur: () => this.form.validate('login'),
            onEmailBlur: () => this.form.validate('email'),
            onPasswordBlur: () => this.form.validate('password'),
            onPhoneBlur: () => this.form.validate('phone'),
            events: {
                submit: this.onSubmit.bind(this),
            },
        });
    }
    componentDidMount() {
        // Set form refs after component has been mounted
        const { firstNameInput: first_name, secondNameInput: second_name, loginInput: login, emailInput: email, passwordInput: password, phoneInput: phone, } = this.refs;
        this.form.setRefs({ first_name, second_name, login, email, password, phone });
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
      {{#CenteredBox title='Регистрация'}}
        <form method='post'>
            {{{FormGroup label='Имя' name='first_name' onBlur=onFirstNameBlur ref='firstNameInput'}}}
            {{{FormGroup label='Фамилия' name='second_name' onBlur=onSecondNameBlur ref='secondNameInput'}}}
            {{{FormGroup label='Имя пользователя' name='login' onBlur=onLoginBlur ref='loginInput'}}}
            {{{FormGroup label='E-mail' type='email' name='email' onBlur=onEmailBlur ref='emailInput'}}}
            {{{FormGroup label='Пароль' type='password' name='password' onBlur=onPasswordBlur ref='passwordInput'}}}
            {{{FormGroup label='Номер телефона' type='tel' name='phone' onBlur=onPhoneBlur ref='phoneInput'}}}
            {{#Button}}Зарегистрироваться{{/Button}}
        </form>
        {{{Link to="${routes_1.routeConsts.SIGNIN}" text='Уже зарегистрированы?' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
    }
}
SignUp.componentName = 'SignUp';
exports.default = (0, utils_2.withStore)(SignUp);
//# sourceMappingURL=SignUp.js.map