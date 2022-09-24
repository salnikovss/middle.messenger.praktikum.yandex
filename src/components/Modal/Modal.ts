import './Modal.scss';

import Component from '../../core/Component';
import { IModalProps } from './types';

export class Modal extends Component {
  static componentName = 'Modal';
  
  constructor(props: IModalProps) {
    super(props);
  }

  render() {
    return `
      <div class='modal'>
        <div class="modal__content">
          {{#if title}}
          <div class="modal__head">
            <p class="modal__title">{{title}}</p>
          </div>
          {{/if}}
          <div class="modal__body">
              {{body}}
          </div>
        </div>
        <div class="modal__backdrop"></div>
      </div>
    `;
  }
}
