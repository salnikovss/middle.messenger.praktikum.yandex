import './Messenger.scss';

import Button from '../../../../components/Button';
import { ButtonType } from '../../../../components/Button/types';
import Component from '../../../../utils/Component';
import { fakeMessages } from '../../../../utils/fakeData';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ButtonStyle } from './../../../../components/Button/types';
import template from './Messenger.hbs';
import { IMessengerProps } from './types';

export class Messenger extends Component {
  constructor({ chat }: IMessengerProps) {
    super({
      chat,
      messages: fakeMessages.map((message) => new Message(message)),
      messageForm: new MessageForm(),
      events: {
        [Component.EVENTS.FLOW_CDM]: () => {
          const objDiv = document.getElementsByClassName('messenger__body');
          objDiv[0].scrollTop = objDiv[0].scrollHeight;
        },
      },
    });
  }

  render(): DocumentFragment {
    const ThreeDotsButton = new Button({
      style: ButtonStyle.ICON,
      type: ButtonType.BUTTON,
      classes: 'messenger__dots-button',
      body: '<span class="dot"></span><span class="dot"></span><span class="dot"></span>',
    });

    // TODO: Trigger after render
    setTimeout(() => {
      const objDiv = document.getElementsByClassName('messenger__body');
      objDiv[0].scrollTop = objDiv[0].scrollHeight;
    }, 200);

    return this.compile(template, {
      ...this.props,
      threeDotsButton: ThreeDotsButton,
    });
  }
}
