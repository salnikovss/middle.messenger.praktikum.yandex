import { InputType } from 'components/Input';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';

import FormValidator from '../../utils/FormValidator';
import { PredefinedRules, ValidationValue } from '../../utils/FormValidator';

export class SignIn extends Component {
  static componentName = 'SignIn';
  private formValidator?: FormValidator;

  constructor() {
    super();

    this.setProps({
      onLoginBlur: this.validate.bind(this, 'login'),
      onPasswordBlur: this.validate.bind(this, 'password'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  prepareFormValidator() {
    const { login, password } = PredefinedRules;
    const rules = { login, password };

    this.formValidator = new FormValidator(rules);
  }

  getSubmittedData(): Record<string, ValidationValue> {
    const { loginInput, passwordInput } = this.refs;
    const loginValue = (loginInput.refs.inputRef.getContent() as HTMLInputElement).value;
    const passwordValue = (passwordInput.refs.inputRef.getContent() as HTMLInputElement).value;
    return {
      login: loginValue,
      password: passwordValue,
    };
  }

  validate(field?: string) {
    if (!this.formValidator) {
      this.prepareFormValidator();
    }

    let validationResult;
    const submittedData = this.getSubmittedData();
    if (field) {
      validationResult = this.formValidator?.validate({ [field]: submittedData[field] });
    } else {
      validationResult = this.formValidator?.validate(submittedData);
    }

    console.log('validationResult', validationResult);

    return validationResult;
  }

  onSubmit(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line no-console
    console.log('Submitted data', this.getSubmittedData());
    // eslint-disable-next-line no-console
    console.log('Validation result', this.validate());
  }

  onLoginFocus(e: PointerEvent) {
    // eslint-disable-next-line no-console
    console.log('onLoginFocus event fired', e);
  }

  onLoginBlur(e: PointerEvent) {
    // eslint-disable-next-line no-console
    console.log('onLoginBlur event fired', e);
  }

  render() {
    //template=hbs
    return `
      {{#CenteredBox title='Авторизация'}}
        <form method='post'>
            {{{FormGroup label='Имя пользователя' name='login' 
                ref='loginInput' 
                onBlur=onLoginBlur 
                onFocus=onLoginFocus
            }}}

            {{{FormGroup label='Пароль' name='password'
                onBlur=onPasswordBlur 
                onFocus=onPasswordFocus
                ref='passwordInput' type='${InputType.PASSWORD}'
            }}}

            {{{Button body='Войти'}}}
        </form>
        {{{Link to='${routeConsts.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
