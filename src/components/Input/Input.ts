import './Input.scss';

import Component from 'core/Component';

import { InputProps, InputPropsWithEvents, InputType } from './types';

export default class Input extends Component<InputPropsWithEvents> {
  static componentName = 'Input';

  constructor({ onInput, onBlur, onFocus, ...rest }: InputProps) {
    super({
      ...rest,
      type: rest.type || InputType.TEXT,
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
      <input
        class='{{#if class}}{{class}}{{else}}input{{/if}} {{#if style}}input_{{style}}{{/if}}'
        type='{{type}}'
        id='field-{{name}}'
        name='{{name}}'
        value='{{value}}'
        {{#if placeholder}}placeholder='{{placeholder}}'{{/if}}
      />
    `;
  }
}
