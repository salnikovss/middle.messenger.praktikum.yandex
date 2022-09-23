import '../../Profile.scss';

import Component from '../../../../core/Component';
import registerComponent from '../../../../core/registerComponent';
import { fakeUserData } from '../../../../utils/fakeData';
import { Avatar } from '../../components/Avatar/Avatar';
import { InputType } from './../../../../components/Input/types';
import { IProfileEditProps } from './types';

export class ProfileEdit extends Component<IProfileEditProps> {
  constructor() {
    registerComponent(Avatar);
    super({
      user: fakeUserData,
    });
  }

  render() {
    return `
      {{#BackButtonWrapper route='CHAT'}}
        <div class='profile'>
            <div class='profile__avatar'>
                {{{Avatar}}}
            </div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                <div class='data__rows-row'>
                    <label for='field-email' class='data__row-param'>Email</label>
                    {{{Input type='${InputType.EMAIL}' name='email' value=user.email class='data__row-form-control'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-login' class='data__row-param'>Имя пользователя</label>
                    {{{Input name='login' value=user.login class='data__row-form-control'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-first_name' class='data__row-param'>Имя</label>
                    {{{Input name='first_name' value=user.first_name class='data__row-form-control'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-second_name' class='data__row-param'>Фамилия</label>
                    {{{Input name='second_name' value=user.second_name class='data__row-form-control'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-display_name' class='data__row-param'>Отображаемое имя</label>
                    {{{Input name='display_name' value=user.display_name class='data__row-form-control'}}}
                </div>
                <div class='data__rows-row'>
                    <label for='field-phone' class='data__row-param'>Телефон</label>
                    {{{Input name='phone' value=user.phone class='data__row-form-control'}}}
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
