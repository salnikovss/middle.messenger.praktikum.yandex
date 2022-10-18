import './Modal.scss';

import Component from 'core/Component';

import { ModalProps, ModalPropsWithEvents } from './types';

export default class Modal extends Component<ModalPropsWithEvents> {
  static componentName = 'Modal';

  constructor({ onShow, onClose, ...rest }: ModalProps) {
    super({
      ...rest,
      events: {
        click: (e: MouseEvent) => {
          if ((e.target as HTMLDivElement).classList.contains('modal__backdrop')) {
            e.preventDefault();
            this.close();
          }
        },
      },
    });

    if (onShow) {
      this._eventBus.on('modalShow', onShow?.bind(this, this));
    }
    if (onClose) {
      this._eventBus.on('modalShow', onClose?.bind(this, this));
    }
  }

  open() {
    this._eventBus.emit('modalShow', { modal: this });
    this.element?.classList.add('modal_show');
  }

  close() {
    this._eventBus.emit('modalClose', { modal: this });
    this.element?.classList.remove('modal_show');
  }

  render() {
    //template=hbs
    return `
      <div class='modal custom-scrollbar'>
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
