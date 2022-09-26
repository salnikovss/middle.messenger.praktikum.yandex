import './FormGroup.scss';

import Component from 'core/Component';

import { IFormGroupProps } from './types';

export class FormGroup extends Component<IFormGroupProps> {
  static componentName = 'FormGroup';

  constructor({ onInput, onBlur, ...rest }: IFormGroupProps) {
    super({
      ...rest,
      onInput: (evt: Event) => {
        this.refs.errorRef.setProps({ text: '' });
        if (onInput) {
          onInput(evt);
        }
      },
      onBlur: (evt: FocusEvent) => {
        const value = (evt.target as HTMLInputElement)?.value;
        const error = value;
        this.refs.errorRef.setProps({ text: error });
        if (onBlur) {
          onBlur(evt);
        }
      },
    });
  }

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
            ref='inputRef'
            onInput=onInput
            onBlur=onBlur
            onFocus=onFocus
        }}}
        {{{Error text=error ref='errorRef'}}}
      </div>    
    `;
  }
}
