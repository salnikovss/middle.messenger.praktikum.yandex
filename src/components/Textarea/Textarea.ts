import './Textarea.scss';

import Component from 'core/Component';

import { TextareaProps, TextareaPropsWithEvents } from './types';

export class Textarea extends Component<TextareaPropsWithEvents> {
  static componentName = 'Textarea';

  constructor({ onInput, onBlur, onFocus, ...rest }: TextareaProps) {
    super({
      ...rest,
      value: rest.value || '',
      events: {
        focus: onFocus,
        blur: onBlur,
        input: onInput,
      },
    });
  }

  render() {
    //template=hbs
    return `
      <textarea class='textarea {{class}}' name='{{name}}'
          id='field-{{name}}' {{#if placeholder}}placeholder='{{placeholder}}'{{/if}}
      >{{value}}</textarea>
    `;
  }
}
