import '../../Profile.scss';

import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import { fakeUserData } from '../../../../utils/fakeData';
import { Avatar } from '../../components/Avatar/Avatar';
import { ProfileFormRow } from '../../components/ProfileFormRow/ProfileFormRow';
import { routeConsts } from './../../../../../config/routes';
import { InputType } from './../../../../components/Input/types';
import { IPasswordChangeProps } from './types';

export class PasswordChange extends Component<IPasswordChangeProps> {
  static componentName = 'PasswordChange';

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
                {{{ProfileFormRow label='Текущий пароль' type='${InputType.PASSWORD}' name='oldPassword'
                      placeholder='********************'}}}

                {{{ProfileFormRow label='Новый пароль' type='${InputType.PASSWORD}' name='newPassword'
                      placeholder='********************'}}}
                      
                {{{ProfileFormRow label='Повторить пароль' type='${InputType.PASSWORD}' name='newPassword2'
                      placeholder='********************'}}}

                <div class='data__rows-row data__rows-row-button'>
                    {{{Button body='Сохранить'}}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
