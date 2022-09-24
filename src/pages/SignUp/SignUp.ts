import { routeConsts } from 'config/routes';
import Component from 'core/Component';
export class SignUp extends Component {
  static componentName = 'SignUp';

  constructor() {
    super();

    this.setProps({
      onSubmit: this.onSubmit.bind(this),
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line no-console
    console.log('submit event fired', e);
  }

  render() {
    return `
      {{#CenteredBox title='Регистрация'}}
        <form method='post'>
            {{{FormGroup label='Имя' name='first_name'}}}
            {{{FormGroup label='Фамилия' name='second_name'}}}
            {{{FormGroup label='Имя пользователя' name='login'}}}
            {{{FormGroup label='E-mail' type='email' name='email'}}}
            {{{FormGroup label='Пароль' type='password' name='password' }}}
            {{{FormGroup label='Номер телефона' type='tel' name='phone'}}}
            {{{Button body='Зарегистрироваться' onClick=onSubmit}}}
        </form>
        {{{Link to="${routeConsts.SIGNIN}" text='Уже зарегистрированы?' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}
