import template from './SignIn.hbs';
import CenteredBox from '../../components/CenteredBox';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const SignIn = () => {
  Button();
  CenteredBox();
  Input();

  return template();
};
