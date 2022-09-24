import './FormGroup.scss';

import Component from '../../core/Component';
import { IFormGroupProps } from './types';

export class FormGroup extends Component<IFormGroupProps> {
  static componentName = 'FormGroup';
  
  render() {
    // template=hbs
    return `
      <div class='form-group'>
        {{#if label}}
          <label for='field-{{name}}' class='form-group__label'>{{label}}</label>
        {{/if}}
        {{{Input 
            name=name
            type=type
            class=class
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
