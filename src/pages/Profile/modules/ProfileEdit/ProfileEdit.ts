import '../../Profile.scss';

import { InputType } from 'components/Input';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import Avatar from 'pages/Profile/components/Avatar';
import ProfileFormRow from 'pages/Profile/components/ProfileFormRow';
import { updateProfile } from 'services/user';
import { Form } from 'utils';
import { predefinedRules } from 'utils/FormValidator';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';

import { ProfileEditProps } from './types';

registerComponent(Avatar);
registerComponent(ProfileFormRow);

const { email, login, first_name, second_name, display_name, phone } = predefinedRules;

class ProfileEdit extends Component<ProfileEditProps> {
  static componentName = 'ProfileEdit';
  public form: Form = new Form({ email, login, first_name, second_name, display_name, phone });

  constructor(props: ProfileEditProps) {
    super({
      ...props,
      onEmailBlur: () => this.form.validate('email'),
      onLoginBlur: () => this.form.validate('login'),
      onFirstNameBlur: () => this.form.validate('first_name'),
      onSecondNameBlur: () => this.form.validate('second_name'),
      onDisplayNameBlur: () => this.form.validate('display_name'),
      onPhoneBlur: () => this.form.validate('phone'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.FLOW_CDM, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDU, this.updateFormRefs.bind(this));
  }

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
    const {
      firstNameInput: first_name,
      secondNameInput: second_name,
      loginInput: login,
      emailInput: email,
      displayNameInput: display_name,
      phoneInput: phone,
    } = this.refs as unknown as Record<string, ProfileFormRow>;
    this.form.setRefs({ email, login, first_name, second_name, display_name, phone });
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();

    if (!this.form.hasErrors) {
      const { email, first_name, login, phone, second_name, display_name } = this.form.getValues();
      this.props.store.dispatch(updateProfile, {
        email,
        first_name,
        login,
        phone,
        second_name,
        display_name,
      });
    }
  }

  render() {
    if (!this.props.user) {
      //template=hbs
      return `
        {{#BackButtonWrapper route='${routeConsts.PROFILE}'}}
        <div class='profile'>
          Загрузка...
        </div>
        {{/BackButtonWrapper}}
      `;
    }

    //template=hbs
    return `
      {{#BackButtonWrapper route='${routeConsts.PROFILE}'}}
        <div class='profile'>
            <div class='profile__avatar'>
                {{{Avatar image=user.avatar editable=true}}}
            </div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
                {{{Error className='error_form' text=formError}}}

                {{{ProfileFormRow label='Email' type='${InputType.EMAIL}' name='email' value=user.email
                      onBlur=onEmailBlur ref='emailInput'}}}

                {{{ProfileFormRow label='Имя пользователя' name='login' value=user.login
                      onBlur=onLoginBlur ref='loginInput'}}}

                {{{ProfileFormRow label='Имя' name='first_name' value=user.first_name
                      onBlur=onFirstNameBlur ref='firstNameInput'}}}

                {{{ProfileFormRow label='Фамилия' name='second_name' value=user.second_name
                      onBlur=onSecondNameBlur ref='secondNameInput'}}}

                {{{ProfileFormRow label='Отображаемое имя' name='display_name' value=user.display_name
                      onBlur=onDisplayNameBlur ref='displayNameInput'}}}

                {{{ProfileFormRow label='Телефон' name='phone' value=user.phone
                      onBlur=onPhoneBlur ref='phoneInput'}}}

                <div class='data__rows-row data__rows-row-button'>
                  {{#Button}}Сохранить{{/Button}}
                </div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}

export default withStore(withUser(ProfileEdit));
