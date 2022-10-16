import { authAPI, SignupRequestData } from 'api/auth';
import FormGroup from 'components/FormGroup';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import { Form } from 'utils';
import withStore from 'utils/withStore';
import { predefinedRules } from 'utils/FormValidator';

import apiHasError from '../../utils/apiHasError';
import { SignUpProps } from './types';

const { first_name, second_name, login, email, password, phone } = predefinedRules;

class SignUp extends Component<SignUpProps> {
  static componentName = 'SignUp';
  public form: Form = new Form({ first_name, second_name, login, email, password, phone });

  constructor(props: SignUpProps) {
    super({
      ...props,
      onFirstNameBlur: () => this.form.validate('first_name'),
      onSecondNameBlur: () => this.form.validate('second_name'),
      onLoginBlur: () => this.form.validate('login'),
      onEmailBlur: () => this.form.validate('email'),
      onPasswordBlur: () => this.form.validate('password'),
      onPhoneBlur: () => this.form.validate('phone'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
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

  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    const formValues = this.form.getValues();

    this.form.validate();

    if (!this.form.hasErrors) {
      const { response } = await authAPI.signup(formValues as SignupRequestData);

      console.log('response', response);
      console.log('apiHasError(response)', apiHasError(response));

      if (apiHasError(response)) {
        console.log('Api error', response.reason);
      } else {
        console.log('user id', response.id);
        const signinResponse = await authAPI.signin({
          login: formValues.login,
          password: formValues.password,
        });
        console.log(signinResponse);
      }
      // this.props.store.dispatch
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
            {{#Button}}Зарегистрироваться{{/Button}}
        </form>
        {{{Link to="${routeConsts.SIGNIN}" text='Уже зарегистрированы?' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}

export default withStore(SignUp);
