import Input from '../../../../components/Input';
import template from './SearchBox.hbs';
import './SearchBox.scss';

export const SearchBox = () => {
  Input();
  const data = {};
  return template(data);
};
