import { InputType } from 'components/Input';
import { routeConsts } from 'config/routes';
import Component from 'core/Component';

export class SignIn extends Component {
  static componentName = 'SignIn';

  constructor() {
    super();

    this.setProps({
      onSubmit: this.onSubmit.bind(this),
      onLoginFocus: this.onLoginFocus.bind(this),
      onLoginBlur: this.onLoginBlur.bind(this),
    });
  }

  onSubmit(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line no-console
    console.log('onSubmit event fired', e);
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
                ref='loginInput' onBlur=onLoginBlur onFocus=onLoginFocus}}}
            {{{FormGroup label='Пароль' name='password'
                ref='passwordInput' type='${InputType.PASSWORD}'}}}

            {{{Button body='Войти'}}}
        </form>
        {{{Link to='${routeConsts.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
