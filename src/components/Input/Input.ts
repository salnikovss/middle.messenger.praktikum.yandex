import './Input.scss';

import Component from '../../utils/Component';
import template from './Input.hbs';
import { IInputProps, InputType } from './types';

export class Input extends Component {
  constructor(props: IInputProps) {
    super({ ...props, type: props.type || InputType.TEXT });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
