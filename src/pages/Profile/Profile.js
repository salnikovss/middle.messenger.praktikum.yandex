"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Profile.scss");
const routes_1 = require("config/routes");
const Component_1 = __importDefault(require("core/Component"));
const registerComponent_1 = __importDefault(require("core/registerComponent"));
const fakeData_1 = require("../../utils/fakeData");
const Avatar_1 = __importDefault(require("./components/Avatar"));
const ProfileDataRow_1 = __importDefault(require("./components/ProfileDataRow"));
class Profile extends Component_1.default {
    constructor() {
        (0, registerComponent_1.default)(Avatar_1.default);
        (0, registerComponent_1.default)(ProfileDataRow_1.default);
        super({
            user: fakeData_1.fakeUserData,
        });
    }
    render() {
        //template=hbs
        return `
      {{#BackButtonWrapper route='${routes_1.routeConsts.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>{{{Avatar}}}</div>
            <div class='profile__display_name'>{{user.display_name}}</div>

            <div class='data__rows-block profile__rows-block-details'>
                {{{ProfileDataRow label='Email' text=user.email}}}
                {{{ProfileDataRow label='Имя пользователя' text=user.login}}}
                {{{ProfileDataRow label='Имя' text=user.first_name}}}
                {{{ProfileDataRow label='Фамилия' text=user.second_name}}}
                {{{ProfileDataRow label='Отображаемое имя' text=user.display_name}}}
                {{{ProfileDataRow label='Телефон' text=user.phone}}}
            </div>

            <div class='data__rows-block profile__rows-block-profile-nav'>
                <div class='data__rows-row'>
                    {{{Link text='Изменить данные' to='${routes_1.routeConsts.PROFILE_EDIT}'
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Сменить пароль' to='${routes_1.routeConsts.PROFILE_PASSWORD_CHANGE}'
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Выйти' to='${routes_1.routeConsts.LOGOUT}'
                        class='data__rows-row-link data__rows-row-link_color-red'}}}
                </div>
            </div>
        </div>
        {{/BackButtonWrapper}}
    `;
    }
}
exports.default = Profile;
Profile.componentName = 'Profile';
//# sourceMappingURL=Profile.js.map