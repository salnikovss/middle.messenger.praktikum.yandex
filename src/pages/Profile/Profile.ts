import './Profile.scss';

import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import { fakeUserData } from '../../utils/fakeData';
import { Avatar } from './components/Avatar/Avatar';
import ProfileDataRow from './components/ProfileDataRow';
import { ProfileProps } from './types';

export class Profile extends Component<ProfileProps> {
  static componentName = 'Profile';

  constructor() {
    registerComponent(Avatar);
    registerComponent(ProfileDataRow);
    super({
      user: fakeUserData,
    });
  }

  render() {
    //template=hbs
    return `
      {{#BackButtonWrapper route='${routeConsts.CHAT}'}}
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
