"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../Profile.scss");
const Input_1 = require("components/Input");
const routes_1 = require("config/routes");
const Component_1 = __importDefault(require("core/Component"));
const registerComponent_1 = __importDefault(require("core/registerComponent"));
const Avatar_1 = __importDefault(require("pages/Profile/components/Avatar"));
const ProfileFormRow_1 = __importDefault(require("pages/Profile/components/ProfileFormRow"));
const utils_1 = require("utils");
const FormValidator_1 = require("utils/FormValidator");
const fakeData_1 = require("../../../../utils/fakeData");
(0, registerComponent_1.default)(Avatar_1.default);
(0, registerComponent_1.default)(ProfileFormRow_1.default);
class ProfileEdit extends Component_1.default {
    constructor() {
        super();
        const { email, login, first_name, second_name, display_name, phone } = FormValidator_1.predefinedRules;
        this.form = new utils_1.Form({ email, login, first_name, second_name, display_name, phone });
        this.setProps({
            user: fakeData_1.fakeUserData,
            onEmailBlur: () => this.form.validate('email'),
            onLoginBlur: () => this.form.validate('login'),
            onFirstNameBlur: () => this.form.validate('first_name'),
            onSecondNameBlur: () => this.form.validate('second_name'),
            onDisplayNameBlur: () => this.form.validate('display_name'),
            onPhoneBlur: () => this.form.validate('phone'),
            events: {
                submit: this.onSubmit.bind(this),
            },
        });
    }
    componentDidMount() {
        // Set form refs after compontent has been mounted
        const { firstNameInput: first_name, secondNameInput: second_name, loginInput: login, emailInput: email, displayNameInput: display_name, phoneInput: phone, } = this.refs;
        this.form.setRefs({ email, login, first_name, second_name, display_name, phone });
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
      {{#BackButtonWrapper route='${routes_1.routeConsts.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>
                {{{Avatar}}}
            </div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{ProfileFormRow label='Email' type='${Input_1.InputType.EMAIL}' name='email' value=user.email
                      onBlur=onEmailBlur ref='emailInput'}}}

                {{{ProfileFormRow label='Имя пользователя' name='login' value=user.login
                      onBlur=onLoginBlur ref='loginInput'}}}

                {{{ProfileFormRow label='Имя' name='first_name' value=user.first_name
                      onBlur=onFirstNameBlur ref='firstNameInput'}}}

                {{{ProfileFormRow label='Фамилия' name='second_name' value=user.second_name
                      onBlur=onSecondNameBlur ref='secondNameInput'}}}

                {{{ProfileFormRow label='Отображаемое имя' name='display_name' value=user.display_name
                      onBlur=onDisplayNameBlur ref='displayNameInput'}}}

                {{{ProfileFormRow label='Телефон' name='phone' value=user.phone
                      onBlur=onPhoneBlur ref='phoneInput'}}}

                <div class='data__rows-row data__rows-row-button'>
                  {{#Button}}Сохранить{{/Button}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
    }
}
exports.default = ProfileEdit;
ProfileEdit.componentName = 'ProfileEdit';
//# sourceMappingURL=ProfileEdit.js.map