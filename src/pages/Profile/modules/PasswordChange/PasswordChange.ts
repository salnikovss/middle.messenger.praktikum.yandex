import { InputType } from './../../../../components/Input/types';
import { routeConsts } from './../../../../../config/routes';
import '../../Profile.scss';

import BackButtonWrapper from '../../../../components/BackButtonWrapper';
import Button from '../../../../components/Button';
import Component from '../../../../core/Component';
import { fakeUserData } from '../../../../utils/fakeData';
import { IPasswordChangeProps } from './types';
import { Avatar } from '../../components/Avatar/Avatar';
import registerComponent from '../../../../core/registerComponent';

export class PasswordChange extends Component<IPasswordChangeProps> {
  // render(): DocumentFragment {
  //   BackButtonWrapper();

  //   // Elements
  //   const Avatar = new AvatarComponent();

  //   const SubmitButton = new Button({
  //     body: 'Сохранить',
  //   });

  //   return this.compile(template, {
  //     submitButton: SubmitButton,
  //     user: fakeUserData,
  //     avatar: Avatar,
  //   });
  // }

  constructor() {
    registerComponent(Avatar);
    super({
      user: fakeUserData,
    });
  }

  render() {
    return `
      {{#>BackButtonWrapper route='${routeConsts.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>
                {{{Avatar}}}
            </div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                <div class='data__rows-row'>
                    <label for='field-oldPassword' class='data__row-param'>Текущий пароль</label>
                    {{{Input type='${InputType.PASSWORD}' name='oldPassword' class='data__row-form-control'
                          placeholder='********************'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-newPassword' class='data__row-param'>Новый пароль</label>
                    {{{Input type='${InputType.PASSWORD}' name='newPassword' class='data__row-form-control'
                          placeholder='********************'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-newPassword2' class='data__row-param'>Повторить пароль</label>
                    {{{Input type='${InputType.PASSWORD}' name='newPassword2' class='data__row-form-control'
                          placeholder='********************'}}}
                </div>
              
                <div class='data__rows-row data__rows-row-button'>
                    {{{Button body='Сохранить'}}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
