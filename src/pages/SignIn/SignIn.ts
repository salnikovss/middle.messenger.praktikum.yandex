import Button from '../../components/Button';
import CenteredBox from '../../components/CenteredBox';
import Input from '../../components/Input';
import template from './SignIn.hbs';

export const SignIn = () => {
  Button();
  CenteredBox();
  Input();

  return template();
};
