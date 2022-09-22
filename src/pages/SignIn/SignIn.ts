import Button from '../../components/Button';
import CenteredBox from '../../components/CenteredBox';
import Input from '../../components/Input';
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
    Input();

    const SubmitButton = new Button({
      body: 'Войти',
      events: {
        click: this.onSubmit,
      },
    });

    return this.compile(template, {
      submitButton: SubmitButton,
    });
  }
}
