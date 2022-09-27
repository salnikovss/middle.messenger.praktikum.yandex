import { InputType } from 'components/Input';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';
import Form from 'utils/Form';

import { FormGroup } from '../../components/FormGroup/FormGroup';
import { PredefinedRules } from '../../utils/FormValidator';
import { ISignInProps } from './types';

export class SignIn extends Component<ISignInProps> {
  static componentName = 'SignIn';
  public form: Form;

  constructor() {
    super();

    const { login, password } = PredefinedRules;
    this.form = new Form({ login, password });

    this.setProps({
      onLoginBlur: () => this.form.validate('login'),
      onPasswordBlur: () => this.form.validate('password'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
    const { loginInput: login, passwordInput: password } = this.refs as Record<string, FormGroup>;
    this.form.setRefs({ login, password });
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
      {{#CenteredBox title='Авторизация'}}
        <form method='post'>
            {{{FormGroup label='Имя пользователя' name='login' 
                ref='loginInput' onBlur=onLoginBlur
            }}}

            {{{FormGroup label='Пароль' name='password' type='${InputType.PASSWORD}'
                onBlur=onPasswordBlur ref='passwordInput'
            }}}

            {{{Button body='Войти'}}}
        </form>
        {{{Link to='${routeConsts.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
