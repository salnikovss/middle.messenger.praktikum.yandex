import './ConfirmationModal.scss';

import Modal from 'components/Modal';
import Component from 'core/Component';
import withStore from 'utils/withStore';

import { ButtonStyle } from './../Button/types';
import { ConfirmationModalProps } from './types';

class ConfirmationModal extends Component<ConfirmationModalProps> {
  static componentName = 'ConfirmationModal';

  constructor({ buttonNoText, buttonYesText, onCancel, onConfirm, ...rest }: ConfirmationModalProps) {
    super({
      ...rest,
      buttonNoText: buttonNoText || 'Отмена',
      buttonYesText: buttonYesText || 'Да',
      onCancel: (e) => {
        e.preventDefault();
        if (typeof onCancel === 'function') {
          onCancel(e);
        }
        this.close();
      },
    });

    this.setProps({
      formError: () => this.props.store?.getState().formError,
      onConfirm: (e) => {
        e.preventDefault();
        if (typeof onConfirm === 'function') {
          onConfirm(e);
        }
      },
    });
  }

  open() {
    (this.refs.modalRef as unknown as Modal).open();
  }

  close() {
    (this.refs.modalRef as unknown as Modal).close();
  }

  render() {
    //template=hbs
    return `
      {{#Modal title=title ref='modalRef'}}
        <div class='confirmation-modal'>
          {{{Error className='error_form' text=formError}}}
          {{#Button className='confirmation-modal__btn' onClick=onCancel}}
            {{buttonNoText}}
          {{/Button}}
          {{#Button className='confirmation-modal__btn' onClick=onConfirm style='${ButtonStyle.DANGER}'}}
            {{buttonYesText}}
          {{/Button}}
        </div>
      {{/Modal}}
    `;
  }
}

export default withStore(ConfirmationModal);
