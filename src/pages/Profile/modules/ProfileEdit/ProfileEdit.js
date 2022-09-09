import BackButtonWrapper from '../../../../components/BackButtonWrapper';
import Button from '../../../../components/Button';
import Avatar from '../../components/Avatar';
import template from './ProfileEdit.hbs';
import '../../Profile.scss';

export const ProfileEdit = () => {
  Avatar();
  BackButtonWrapper();
  Button();

  const data = {
    user: {
      display_name: 'Иван',
      first_name: 'Иван',
      second_name: 'Иванов',
      login: 'ivanivanov',
      email: 'pochta@yandex.ru',
      phone: '+7 (909) 967 30 30',
    },
  };
  return template(data);
};
