import './Modal.scss';

import Component from '../../core/Component';
import template from './Modal.hbs';
import { IModalProps } from './types';

export class Modal extends Component {
  constructor(props: IModalProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
