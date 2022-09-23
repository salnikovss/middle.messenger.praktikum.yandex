import './Input.scss';

import Component from '../../core/Component';
import { IInputProps, IInputPropsWithEvents, InputType } from './types';

export class Input extends Component<IInputPropsWithEvents> {
  constructor({ onBlur, onFocus, ...rest }: IInputProps) {
    super({
      ...rest,
      type: rest.type || InputType.TEXT,
      value: rest.value || '',
      events: {
        focus: onFocus,
        blur: onBlur,
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
