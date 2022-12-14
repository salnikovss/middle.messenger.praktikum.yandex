import FormGroup from 'components/FormGroup';
import { ROUTE_PATHS } from 'config/routes';
import Component from 'core/Component';
import { register } from 'services/auth';
import Form from 'utils/Form';
import { predefinedRules } from 'utils/FormValidator';
import withStore from 'utils/withStore';

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
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this.updateFormRefs.bind(this));
  }

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
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

    this.form.validate();

    if (!this.form.hasErrors) {
      const { email, first_name, login, password, phone, second_name } = this.form.getValues();
      this.props.store.dispatch(register, {
        email,
        first_name,
        login,
        password,
        phone,
        second_name,
      });
    }
  }

  render() {
    //template=hbs
    return `
      {{#CenteredBox title='??????????????????????'}}
        <form method='post'>
            {{{Error className='error_form' text=formError}}}
            {{{FormGroup label='??????' name='first_name' onBlur=onFirstNameBlur ref='firstNameInput'}}}
            {{{FormGroup label='??????????????' name='second_name' onBlur=onSecondNameBlur ref='secondNameInput'}}}
            {{{FormGroup label='?????? ????????????????????????' name='login' onBlur=onLoginBlur ref='loginInput'}}}
            {{{FormGroup label='E-mail' type='email' name='email' onBlur=onEmailBlur ref='emailInput'}}}
            {{{FormGroup label='????????????' type='password' name='password' onBlur=onPasswordBlur ref='passwordInput'}}}
            {{{FormGroup label='?????????? ????????????????' type='tel' name='phone' onBlur=onPhoneBlur ref='phoneInput'}}}
            {{#Button}}????????????????????????????????????{{/Button}}
        </form>
        {{{Link to="${ROUTE_PATHS.SIGNIN}" text='?????? ?????????????????????????????????' class='text-center d-block mt-1'}}}
      {{/CenteredBox}}
    `;
  }
}

export default withStore(SignUp);
