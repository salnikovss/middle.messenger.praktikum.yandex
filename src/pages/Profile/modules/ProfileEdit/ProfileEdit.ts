import '../../Profile.scss';

import { Avatar } from 'components/Avatar/Avatar';
import { ProfileFormRow } from 'components/ProfileFormRow/ProfileFormRow';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import { fakeUserData } from '../../../../utils/fakeData';
import { InputType } from './components/Input/types';
import { IProfileEditProps } from './types';

export class ProfileEdit extends Component<IProfileEditProps> {
  static componentName = 'ProfileEdit';

  constructor() {
    registerComponent(Avatar);
    registerComponent(ProfileFormRow);
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

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{ProfileFormRow label='Email' type='${InputType.EMAIL}' name='email' value=user.email}}}
                {{{ProfileFormRow label='Имя пользователя' name='login' value=user.login}}}
                {{{ProfileFormRow label='Имя' name='first_name' value=user.first_name}}}
                {{{ProfileFormRow label='Фамилия' name='second_name' value=user.second_name}}}
                {{{ProfileFormRow label='Отображаемое имя' name='display_name' value=user.display_name}}}
                {{{ProfileFormRow label='Телефон' name='phone' value=user.phone}}}
                <div class='data__rows-row data__rows-row-button'>
                  {{{Button body='Сохранить'}}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
