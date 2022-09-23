import './Avatar.scss';

import Component from '../../../../core/Component';

export class Avatar extends Component {
  render() {
    return `
      <a href='#' class='avatar {{#if image}}avatar_filled{{/if}}'>
        <div class='avatar__inner' {{#if image}}style='background-image: url({{image}})'{{/if}}>
          <div class='avatar__hover'>Загрузить<br/>аватар</div>
        </div>
      </a>
    `;
  }
}
