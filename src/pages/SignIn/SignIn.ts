import FormGroup from 'components/FormGroup';
import { InputType } from 'components/Input';
import { ROUTE_PATHS } from 'config/routes';
import Component from 'core/Component';
import { login } from 'services/auth';
import Form from 'utils/Form';
import withStore from 'utils/withStore';

import { predefinedRules } from '../../utils/FormValidator/predefinedRules';
import { SignInProps } from './types';

class SignIn extends Component<SignInProps> {
  static componentName = 'SignIn';
  public form: Form = new Form({
    login: predefinedRules.login,
    password: predefinedRules.password,
  });

  constructor(props: SignInProps) {
    super({
      ...props,
      onLoginBlur: () => this.form.validate('login'),
      onPasswordBlur: () => this.form.validate('password'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this.updateFormRefs.bind(this));
  }

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
    const { loginInput: login, passwordInput: password } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ login, password });
  }

  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();

    if (!this.form.hasErrors) {
      const formValues = this.form.getValues();
      this.props.store.dispatch(login, { login: formValues.login, password: formValues.password });
    }
  }

  render() {
    //template=hbs
    return `
      {{#CenteredBox title='Авторизация'}}
        <form method='post'>
            {{{Error className='error_form' text=formError}}}

            {{{FormGroup label='Имя пользователя' name='login'
                ref='loginInput' onBlur=onLoginBlur}}}

            {{{FormGroup label='Пароль' name='password' type='${InputType.PASSWORD}'
                onBlur=onPasswordBlur ref='passwordInput'}}}

            {{#Button}}Войти{{/Button}}
        </form>
        {{{Link to='${ROUTE_PATHS.SIGNUP}' text='Регистрация' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}

export default withStore(SignIn);
