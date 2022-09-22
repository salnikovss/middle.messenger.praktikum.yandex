import './MessageForm.scss';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Component from '../../../../utils/Component';
import { ButtonStyle } from './../../../../components/Button/types';
import template from './MessageForm.hbs';

export class MessageForm extends Component {
  render(): DocumentFragment {
    Input();

    const SendButton = new Button({
      body: '<i class="icon message-form__send-button-icon"></i>',
      style: ButtonStyle.ICON,
      classes: 'btn_primary',
    });

    return this.compile(template, {
      sendButton: SendButton,
    });
  }
}
