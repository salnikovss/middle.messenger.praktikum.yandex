import './Profile.scss';

import BackButtonWrapper from '../../components/BackButtonWrapper';
import Component from '../../utils/Component';
import { fakeUserData } from '../../utils/fakeData';
import { default as AvatarComponent } from './components/Avatar';
import template from './Profile.hbs';

export class Profile extends Component {
  render(): DocumentFragment {
    BackButtonWrapper();
    const Avatar = new AvatarComponent();

    return this.compile(template, {
      user: fakeUserData,
      avatar: Avatar,
    });
  }
}
