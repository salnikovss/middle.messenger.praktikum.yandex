import './Button.scss';

import Component from '../../core/Component';
import { ButtonStyle, ButtonType, IButtonProps, IButtonPropsWithEvents } from './types';

export class Button extends Component<IButtonPropsWithEvents> {
  constructor({ onClick, ...rest }: IButtonProps) {
    const defaultProps = {
      type: ButtonType.SUBMIT,
      style: ButtonStyle.PRIMARY,
    };

    // TODO: check why button renders 4 times
    // console.log('onClick', onClick);

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
        {{{body}}}
      </button>
    `;
  }
}
