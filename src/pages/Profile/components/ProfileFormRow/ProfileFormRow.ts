import Component from 'core/Component';

import { IProfileFormRowProps } from './types';

export class ProfileFormRow extends Component<IProfileFormRowProps> {
  static componentName = 'ProfileFormRow';

  render() {
    // template=hbs
    return `
      <div class='data__rows-row'>
        {{#if label}}
          <label for='field-{{name}}' class='data__row-param'>{{label}}</label>
        {{/if}}
        {{{Input 
            name=name
            type=type
            class='data__row-form-control'
            style=style
            placeholder=placeholder
            value=value
            onBlur=onBlur
            onFocus=onFocus
        }}}
        <p class='form-group__help-box'></p>
      </div>    
    `;
  }
}
