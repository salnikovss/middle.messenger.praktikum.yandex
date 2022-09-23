import './Profile.scss';

import BackButtonWrapper from '../../components/BackButtonWrapper';
import Component from '../../core/Component';
import registerComponent from '../../core/registerComponent';
import { fakeUserData } from '../../utils/fakeData';
import { routeConsts } from './../../../config/routes';
import { Avatar } from './components/Avatar/Avatar';

export class Profile extends Component {
  constructor() {
    registerComponent('Avatar', Avatar);
    super({
      user: fakeUserData,
    });
  }

  render() {
    return `
      {{#BackButtonWrapper route='${routeConsts.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>
                {{{Avatar}}}
            </div>
            <div class='profile__display_name'>
                {{user.display_name}}
            </div>

            <div class='data__rows-block profile__rows-block-details'>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Email</span>
                    <span class='data__row-value'>{{user.email}}</span>
                </div>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Имя пользователя</span>
                    <span class='data__row-value'>{{user.login}}</span>
                </div>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Имя</span>
                    <span class='data__row-value'>{{user.first_name}}</span>
                </div>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Фамилия</span>
                    <span class='data__row-value'>{{user.second_name}}</span>
                </div>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Отображаемое имя</span>
                    <span class='data__row-value'>{{user.display_name}}</span>
                </div>
                <div class='data__rows-row'>
                    <span class='data__row-param'>Телефон</span>
                    <span class='data__row-value'>{{user.phone}}</span>
                </div>
            </div>

            <div class='data__rows-block profile__rows-block-profile-nav'>
                <div class='data__rows-row'>
                    {{{Link text='Изменить данные' to='${routeConsts.PROFILE_EDIT}' 
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Сменить пароль' to='${routeConsts.PROFILE_PASSWORD_CHANGE}' 
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Выйти' to='${routeConsts.LOGOUT}' 
                        class='data__rows-row-link data__rows-row-link_color-red'}}}
                </div>
            </div>

        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
