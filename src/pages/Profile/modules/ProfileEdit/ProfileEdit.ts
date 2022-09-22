import '../../Profile.scss';

import BackButtonWrapper from '../../../../components/BackButtonWrapper';
import { Button } from '../../../../components/Button/Button';
import Input from '../../../../components/Input';
import Component from '../../../../utils/Component';
import { fakeUserData } from '../../../../utils/fakeData';
import { default as AvatarComponent } from '../../components/Avatar';
import template from './ProfileEdit.hbs';

export class ProfileEdit extends Component {
  render(): DocumentFragment {
    BackButtonWrapper();
    Input();

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
