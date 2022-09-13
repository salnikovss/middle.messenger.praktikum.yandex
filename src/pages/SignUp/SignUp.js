import Button from '../../components/Button';
import CenteredBox from '../../components/CenteredBox';
import Input from '../../components/Input';
import template from './SignUp.hbs';
export const SignUp = () => {
  Button();
  CenteredBox();
  Input();
  
  return template();
};
