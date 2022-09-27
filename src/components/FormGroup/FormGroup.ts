import './FormGroup.scss';

import Component from 'core/Component';

import { IFormGroupProps } from './types';

export class FormGroup extends Component<IFormGroupProps> {
  static componentName = 'FormGroup';

  constructor({ onFocus, ...rest }: IFormGroupProps) {
    super({
      ...rest,
      onFocus: (evt: FocusEvent) => {
        this.setError();

        if (onFocus) {
          onFocus(evt);
        }
      },
    });
  }

  setError(text = '') {
    this.refs.errorRef.setProps({ text });
  }

  render() {
    // template=hbs
    return `
      <div class='form-group {{#if error}}form-group_has-error{{/if}}'>
        {{#if label}}
          <label for='field-{{name}}' class='form-group__label'>{{label}}</label>
        {{/if}}
        {{#if textarea}}
          {{{Textarea 
              class=class 
              name='message' 
              placeholder=placeholder
              ref='inputRef' 
              onInput=onInput
              onBlur=onBlur
              onFocus=onFocus    
              value=value
          }}}
        {{else}}
          {{{Input 
              name=name
              type=type
              class=class
              style=style
              placeholder=placeholder
              value=value
              ref='inputRef'
              onInput=onInput
              onBlur=onBlur
              onFocus=onFocus
          }}}
        {{/if}}
        {{{Error text=error ref='errorRef'}}}
      </div>    
    `;
  }
}
