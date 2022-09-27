import './Textarea.scss';

import Component from 'core/Component';

import { ITextareaProps, ITextareaPropsWithEvents } from './types';

export class Textarea extends Component<ITextareaPropsWithEvents> {
  static componentName = 'Textarea';

  constructor({ onInput, onBlur, onFocus, ...rest }: ITextareaProps) {
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
