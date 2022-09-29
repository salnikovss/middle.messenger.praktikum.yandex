import './Modal.scss';

import Component from 'core/Component';

import { ModalProps } from './types';

export class Modal extends Component<ModalProps> {
  static componentName = 'Modal';

  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    //template=hbs
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
