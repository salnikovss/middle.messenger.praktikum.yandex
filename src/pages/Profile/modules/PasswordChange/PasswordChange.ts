import '../../Profile.scss';

import BackButtonWrapper from '../../../../components/BackButtonWrapper';
import Button from '../../../../components/Button';
import Component from '../../../../utils/Component';
import { fakeUserData } from '../../../../utils/fakeData';
import { default as AvatarComponent } from '../../components/Avatar';
import template from './PasswordChange.hbs';

export class PasswordChange extends Component {
  render(): DocumentFragment {
    BackButtonWrapper();

    // Elements
    const Avatar = new AvatarComponent();

    const SubmitButton = new Button({
      body: 'Сохранить',
    });

    return this.compile(template, {
      submitButton: SubmitButton,
      user: fakeUserData,
      avatar: Avatar,
    });
  }
}
