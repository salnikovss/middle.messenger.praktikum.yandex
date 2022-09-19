import Input from '../../../../components/Input';
import template from './SearchBox.hbs';

export const SearchBox = () => {
  Input();
  const data = {};
  return template(data);
};
