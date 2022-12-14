import '../../Profile.scss';

import { InputType } from 'components/Input';
import { ROUTE_PATHS } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import Avatar from 'pages/Profile/components/Avatar';
import ProfileFormRow from 'pages/Profile/components/ProfileFormRow';
import Form from 'utils/Form';
import { predefinedRules } from 'utils/FormValidator';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';

import { updatePassword } from '../../../../services/user';
import { PasswordChangeProps } from './types';

registerComponent(Avatar);
registerComponent(ProfileFormRow);

const { password: old_password, password: new_password, password: new_password2 } = predefinedRules;

class PasswordChange extends Component<PasswordChangeProps> {
  static componentName = 'PasswordChange';
  public form: Form = new Form({ old_password, new_password, new_password2 });

  constructor(props: PasswordChangeProps) {
    super({
      ...props,
      onOldPasswordBlur: () => this.form.validate('old_password'),
      onNewPasswordBlur: () => this.form.validate('new_password'),
      onNewPassword2Blur: () => this.form.validate('new_password2'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this.updateFormRefs.bind(this));
  }

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
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

    this.form.validate();

    if (!this.form.hasErrors) {
      const { old_password: oldPassword, new_password: newPassword } = this.form.getValues();
      this.props.store.dispatch(updatePassword, { oldPassword, newPassword });
    }
  }

  render() {
    //template=hbs
    return `
      {{#BackButtonWrapper route='${ROUTE_PATHS.PROFILE}'}}
        <div class='profile'>
            <div class='profile__avatar'>{{{Avatar image=user.avatar}}}</div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{Error className='error_form' text=formError}}}

                {{{ProfileFormRow label='?????????????? ????????????' type='${InputType.PASSWORD}' name='oldPassword'
                      placeholder='********************' onBlur=onOldPasswordBlur ref='oldPasswordInput'}}}

                {{{ProfileFormRow label='?????????? ????????????' type='${InputType.PASSWORD}' name='newPassword'
                      placeholder='********************' onBlur=onNewPasswordBlur ref='newPasswordInput'}}}

                {{{ProfileFormRow label='?????????????????? ????????????' type='${InputType.PASSWORD}' name='newPassword2'
                      placeholder='********************' onBlur=onNewPassword2Blur ref='newPassword2Input'}}}

                <div class='data__rows-row data__rows-row-button'>
                  {{#Button}}??????????????????{{/Button}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}

export default withStore(withUser(PasswordChange));
