import './MessageForm.scss';

import Component from '../../../../core/Component';
import { ButtonStyle } from './../../../../components/Button/types';

export class MessageForm extends Component {
  constructor() {
    super();
  }

  render() {
    return `
      <form class='message-form'>
        <div class='message-form__attachments-button'>
            {{{Button body="<i class='icon message-form__attachments-button-icon'></i>" type='button' style='icon'}}}
        </div>  
        <div class='message-form__input-container'>
            <textarea class='message-form__input' name='message' 
                placeholder='Сообщение...' oninput='textareaAutogrow'></textarea>
        </div>
        <div class='message-form__send-button'>
            {{{Button body='<i class="icon message-form__send-button-icon"></i>'
              style='${ButtonStyle.ICON}' classes='btn_primary'}}}
        </div>
    </form>

    `;
  }

  // render(): DocumentFragment {
  //   Input();

  //   const SendButton = new Button({
  //     body: '<i class="icon message-form__send-button-icon"></i>',
  //     style: ButtonStyle.ICON,
  //     classes: 'btn_primary',
  //   });

  //   return this.compile(template, {
  //     sendButton: SendButton,
  //   });
  // }
}
