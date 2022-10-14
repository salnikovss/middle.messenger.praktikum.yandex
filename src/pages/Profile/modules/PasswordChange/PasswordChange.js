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
class PasswordChange extends Component_1.default {
    constructor() {
        super();
        const { password: old_password, password: new_password, password: new_password2 } = FormValidator_1.predefinedRules;
        this.form = new utils_1.Form({ old_password, new_password, new_password2 });
        this.setProps({
            user: fakeData_1.fakeUserData,
            onOldPasswordBlur: () => this.form.validate('email'),
            onNewPasswordBlur: () => this.form.validate('login'),
            onNewPassword2Blur: () => this.form.validate('first_name'),
            events: {
                submit: this.onSubmit.bind(this),
            },
        });
    }
    componentDidMount() {
        // Set form refs after compontent has been mounted
        const { oldPasswordInput: old_password, newPasswordInput: new_password, newPassword2Input: new_password2, } = this.refs;
        this.form.setRefs({ old_password, new_password, new_password2 });
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
            <div class='profile__avatar'>{{{Avatar}}}</div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{ProfileFormRow label='Текущий пароль' type='${Input_1.InputType.PASSWORD}' name='oldPassword'
                      placeholder='********************' onBlur=onOldPasswordBlur ref='oldPasswordInput'}}}

                {{{ProfileFormRow label='Новый пароль' type='${Input_1.InputType.PASSWORD}' name='newPassword'
                      placeholder='********************' onBlur=onNewPasswordBlur ref='newPasswordInput'}}}

                {{{ProfileFormRow label='Повторить пароль' type='${Input_1.InputType.PASSWORD}' name='newPassword2'
                      placeholder='********************' onBlur=onNewPassword2Blur ref='newPassword2Input'}}}

                <div class='data__rows-row data__rows-row-button'>
                  {{#Button}}Сохранить{{/Button}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
    }
}
exports.default = PasswordChange;
PasswordChange.componentName = 'PasswordChange';
//# sourceMappingURL=PasswordChange.js.map