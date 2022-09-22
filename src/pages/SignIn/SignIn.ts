import Button from '../../components/Button';
import CenteredBox from '../../components/CenteredBox';
import FormGroup from '../../components/FormGroup';
import { InputType } from '../../components/Input';
import Component from '../../utils/Component';
import template from './SignIn.hbs';

export class SignIn extends Component {
  onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log('submit event fired', e);
  }

  render(): DocumentFragment {
    CenteredBox();

    const SubmitButton = new Button({
      body: 'Войти',
      events: {
        click: this.onSubmit,
      },
    });

    const LoginFormGroup = new FormGroup({
      label: 'Имя пользователя',
      input: {
        name: 'login',
        events: {
          blur: (e: Event) => {
            console.log('LoginInput blur', e);
          },
          focus: (e: Event) => {
            console.log('LoginInput focus', e);
          },
        },
      },
    });

    const PasswordFormGroup = new FormGroup({
      label: 'Пароль',
      input: {
        name: 'password',
        type: InputType.PASSWORD,
        events: {
          blur: (e: Event) => {
            console.log('PasswordInput blur', e);
          },
          focus: (e: Event) => {
            console.log('PasswordInput focus', e);
          },
        },
      },
    });

    return this.compile(template, {
      submitButton: SubmitButton,
      loginFormGroup: LoginFormGroup,
      passwordFormGroup: PasswordFormGroup,
    });
  }
}
