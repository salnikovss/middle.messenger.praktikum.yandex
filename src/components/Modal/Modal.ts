import './Modal.scss';

import Component from 'core/Component';

import { ModalProps, ModalPropsWithEvents } from './types';

export default class Modal extends Component<ModalPropsWithEvents> {
  static componentName = 'Modal';

  constructor({ ...rest }: ModalProps) {
    super({
      ...rest,
      events: {
        click: (e: MouseEvent) => {
          if ((e.target as HTMLDivElement).classList.contains('modal__backdrop')) {
            e.preventDefault();
            this.element?.classList.remove('modal_show');
          }
        },
      },
    });
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
              <template data-slot='1'></template>
          </div>
        </div>
        <div class="modal__backdrop"></div>
      </div>
    `;
  }
}
