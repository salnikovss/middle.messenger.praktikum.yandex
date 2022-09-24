import { InputType } from '../../components/Input';
import Component from '../../core/Component';
import { routeConsts } from './../../../config/routes';

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
    console.log('onSubmit event fired', e);
  }

  onLoginFocus(e: PointerEvent) {
    console.log('onLoginFocus event fired', e);
  }

  onLoginBlur(e: PointerEvent) {
    console.log('onLoginBlur event fired', e);
  }

  render() {
    console.log(123);

    //template=hbs
    return `
      {{#CenteredBox title='Авторизация'}}
        <form method='post'>
            {{{FormGroup label='Имя пользователя' name='login' onBlur=onLoginBlur onFocus=onLoginFocus}}}
            {{{FormGroup label='Пароль' name='password' type='${InputType.PASSWORD}'}}}

            {{{Button body='Войти'}}}
        </form>
        {{{Link to='${routeConsts.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
