import './Profile.scss';

import { ROUTE_PATHS } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import { logout } from 'services/auth';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';

import Avatar from './components/Avatar';
import ProfileDataRow from './components/ProfileDataRow';
import { ProfileProps } from './types';

class Profile extends Component<ProfileProps> {
  static componentName = 'Profile';

  constructor(props: ProfileProps) {
    registerComponent(Avatar);
    registerComponent(ProfileDataRow);
    super({
      ...props,
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  render() {
    if (!this.props.user) {
      //template=hbs
      return `
        {{#BackButtonWrapper route='${ROUTE_PATHS.CHAT}'}}
        <div class='profile'>
          Загрузка...
        </div>
        {{/BackButtonWrapper}}
      `;
    }

    //template=hbs
    return `
      {{#BackButtonWrapper route='${ROUTE_PATHS.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>{{{Avatar image=user.avatar}}}</div>
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
                    {{{Link text='Изменить данные' to='${ROUTE_PATHS.PROFILE_EDIT}'
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Сменить пароль' to='${ROUTE_PATHS.PROFILE_PASSWORD_CHANGE}'
                        class='data__rows-row-link'}}}
                </div>
                <div class='data__rows-row'>
                    {{{Link text='Выйти' onClick=onLogout
                        class='data__rows-row-link data__rows-row-link_color-red'}}}
                </div>
            </div>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}

export default withStore(withUser(Profile));
