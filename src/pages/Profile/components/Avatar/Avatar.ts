import './Avatar.scss';

import Component from 'core/Component';

import { AvatarProps } from './types';

export default class Avatar extends Component<AvatarProps> {
  static componentName = 'Avatar';

  render() {
    //template=hbs
    return `
      <a href='#' class='avatar {{#if image}}avatar_filled{{/if}}'>
        <div class='avatar__inner' {{#if image}}style='background-image: url({{image}})'{{/if}}>
          <div class='avatar__hover'>Загрузить<br/>аватар</div>
        </div>
      </a>
    `;
  }
}
