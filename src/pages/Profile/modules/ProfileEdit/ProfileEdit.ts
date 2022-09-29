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
import { ProfileEditProps } from './types';

registerComponent(Avatar);
registerComponent(ProfileFormRow);
export default class ProfileEdit extends Component<ProfileEditProps> {
  static componentName = 'ProfileEdit';
  public form: Form;

  constructor() {
    super();

    const { email, login, first_name, second_name, display_name, phone } = predefinedRules;
    this.form = new Form({ email, login, first_name, second_name, display_name, phone });

    this.setProps({
      user: fakeUserData,
      onEmailBlur: () => this.form.validate('email'),
      onLoginBlur: () => this.form.validate('login'),
      onFirstNameBlur: () => this.form.validate('first_name'),
      onSecondNameBlur: () => this.form.validate('second_name'),
      onDisplayNameBlur: () => this.form.validate('display_name'),
      onPhoneBlur: () => this.form.validate('phone'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
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
            <div class='profile__avatar'>
                {{{Avatar}}}
            </div>

            <form class='data__rows-block profile__rows-block-details' method='post'>
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

                <div class='data__rows-row data__rows-row-button'>{{{Button body='Сохранить'}}}</div>
            </form>
        </div>
        {{/BackButtonWrapper}}
    `;
  }
}
