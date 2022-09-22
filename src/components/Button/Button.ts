import './Button.scss';

import Component from '../../utils/Component';
import template from './Button.hbs';
import { ButtonStyle, ButtonType, IButtonProps } from './types';

export class Button extends Component {
  constructor(props: IButtonProps) {
    super({
      ...props,
      type: props.type || ButtonType.SUBMIT,
      style: props.style || ButtonStyle.PRIMARY,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
