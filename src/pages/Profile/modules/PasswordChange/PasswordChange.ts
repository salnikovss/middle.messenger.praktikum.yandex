import '../../Profile.scss';

import { InputType } from 'components/Input';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import Avatar from 'pages/Profile/components/Avatar';
import ProfileFormRow from 'pages/Profile/components/ProfileFormRow';
import Form from 'utils/Form';
import { predefinedRules } from 'utils/FormValidator';

import { fakeUserData } from '../../../../utils/fakeData';
import { PasswordChangeProps } from './types';

registerComponent(Avatar);
registerComponent(ProfileFormRow);
export default class PasswordChange extends Component<PasswordChangeProps> {
  static componentName = 'PasswordChange';
  public form: Form;

  constructor() {
    super();

    const { password: old_password, password: new_password, password: new_password2 } = predefinedRules;
    this.form = new Form({ old_password, new_password, new_password2 });

    this.setProps({
      user: fakeUserData,
      onOldPasswordBlur: () => this.form.validate('email'),
      onNewPasswordBlur: () => this.form.validate('login'),
      onNewPassword2Blur: () => this.form.validate('first_name'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
    const {
      oldPasswordInput: old_password,
      newPasswordInput: new_password,
      newPassword2Input: new_password2,
    } = this.refs as unknown as Record<string, ProfileFormRow>;
    this.form.setRefs({ old_password, new_password, new_password2 });
  }

  onSubmit(e: SubmitEvent) {
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
      {{#BackButtonWrapper route='${routeConsts.CHAT}'}}
        <div class='profile'>
            <div class='profile__avatar'>{{{Avatar}}}</div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{ProfileFormRow label='Текущий пароль' type='${InputType.PASSWORD}' name='oldPassword'
                      placeholder='********************' onBlur=onOldPasswordBlur ref='oldPasswordInput'}}}

                {{{ProfileFormRow label='Новый пароль' type='${InputType.PASSWORD}' name='newPassword'
                      placeholder='********************' onBlur=onNewPasswordBlur ref='newPasswordInput'}}}

                {{{ProfileFormRow label='Повторить пароль' type='${InputType.PASSWORD}' name='newPassword2'
                      placeholder='********************' onBlur=onNewPassword2Blur ref='newPassword2Input'}}}

                <div class='data__rows-row data__rows-row-button'>{{{Button body='Сохранить'}}}</div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
