import Component from 'core/Component';

import { ProfileDataRowProps } from './types';

export class ProfileFormRow extends Component<ProfileDataRowProps> {
  static componentName = 'ProfileDataRow';

  render() {
    // template=hbs
    return `
      <div class='data__rows-row'>
        {{#if label}}
          <span class='data__row-param'>{{label}}</span>
        {{/if}}
        {{#if text}}
          <span class='data__row-value'>{{text}}</span>
        {{/if}}
      </div>
    `;
  }
}
