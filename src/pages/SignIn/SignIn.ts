import Button from '../../components/Button';
import CenteredBox from '../../components/CenteredBox';
import Input from '../../components/Input';
import Component from '../../utils/Component';
import template from './SignIn.hbs';

// export const SignIn2 = () => {
//   Button();
//   CenteredBox();
//   Input();

//   return template();
// };

export class SignIn extends Component {
  render(): DocumentFragment {
    Button();
    CenteredBox();
    Input();
    return this.compile(template, {});
  }
}
