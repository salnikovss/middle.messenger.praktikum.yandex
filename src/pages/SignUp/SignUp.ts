import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import Form from 'utils/Form';
import { PredefinedRules } from 'utils/FormValidator';

import { FormGroup } from '../../components/FormGroup/FormGroup';
import { SignUpProps } from './types';

export class SignUp extends Component<SignUpProps> {
  static componentName = 'SignUp';
  public form: Form;

  constructor() {
    super();

    const { first_name, second_name, login, email, password, phone } = PredefinedRules;
    this.form = new Form({ first_name, second_name, login, email, password, phone });

    this.setProps({
      onFirstNameBlur: () => this.form.validate('first_name'),
      onSecondNameBlur: () => this.form.validate('second_name'),
      onLoginBlur: () => this.form.validate('login'),
      onEmailBlur: () => this.form.validate('email'),
      onPasswordBlur: () => this.form.validate('password'),
      onPhoneBlur: () => this.form.validate('phone'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after component has been mounted
    const {
      firstNameInput: first_name,
      secondNameInput: second_name,
      loginInput: login,
      emailInput: email,
      passwordInput: password,
      phoneInput: phone,
    } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ first_name, second_name, login, email, password, phone });
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
      {{#CenteredBox title='Регистрация'}}
        <form method='post'>
            {{{FormGroup label='Имя' name='first_name' onBlur=onFirstNameBlur ref='firstNameInput'}}}
            {{{FormGroup label='Фамилия' name='second_name' onBlur=onSecondNameBlur ref='secondNameInput'}}}
            {{{FormGroup label='Имя пользователя' name='login' onBlur=onLoginBlur ref='loginInput'}}}
            {{{FormGroup label='E-mail' type='email' name='email' onBlur=onEmailBlur ref='emailInput'}}}
            {{{FormGroup label='Пароль' type='password' name='password' onBlur=onPasswordBlur ref='passwordInput'}}}
            {{{FormGroup label='Номер телефона' type='tel' name='phone' onBlur=onPhoneBlur ref='phoneInput'}}}
            {{{Button body='Зарегистрироваться'}}}
        </form>
        {{{Link to="${routeConsts.SIGNIN}" text='Уже зарегистрированы?' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
