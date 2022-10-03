import './Button.scss';

import Component from 'core/Component';

import { ButtonProps, ButtonPropsWithEvents, ButtonStyle, ButtonType } from './types';

export default class Button extends Component<ButtonPropsWithEvents> {
  static componentName = 'Button';

  constructor({ onClick, ...rest }: ButtonProps) {
    const defaultProps = {
      type: ButtonType.SUBMIT,
      style: ButtonStyle.PRIMARY,
    };

    super({
      ...defaultProps,
      ...rest,
      events: { click: onClick },
    });
  }

  render() {
    // language=hbs
    return `
      <button type='{{type}}' class='btn btn_{{style}} {{classes}}'>
        <template data-slot='1'></template>
      </button>
    `;
  }
}
