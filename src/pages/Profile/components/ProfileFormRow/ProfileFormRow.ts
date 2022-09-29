import Component from 'core/Component';

import { ProfileFormRowProps } from './types';

export class ProfileFormRow extends Component<ProfileFormRowProps> {
  static componentName = 'ProfileFormRow';

  constructor({ onFocus, ...rest }: ProfileFormRowProps) {
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
            ref='inputRef'
            onBlur=onBlur
            onFocus=onFocus
        }}}
        {{{Error text=error ref='errorRef'}}}
      </div>
    `;
  }
}
