import './FormGroup.scss';

import Component from '../../utils/Component';
import { Input } from '../Input/Input';
import template from './FormGroup.hbs';
import { IFormGroupProps } from './types';

export class FormGroup extends Component {
  render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      input: new Input((this.props as IFormGroupProps).input),
    });
  }
}
