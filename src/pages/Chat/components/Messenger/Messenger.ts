import './Messenger.scss';

import image from '../../../../../static/images/camera-image.jpg';
import Button from '../../../../components/Button';
import Component from '../../../../utils/Component';
import { ChatModel } from '../../';
import Message from '../Message';
import MessageForm from '../MessageForm';
import template from './Messenger.hbs';

const generateFakeDate = (() => {
  const date = new Date();
  return (adjustMinutes: number) => {
    date.setMinutes(date.getMinutes() - adjustMinutes);
    return date;
  };
})();

const messages = [
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: generateFakeDate(60),
    type: 'text',
    body: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  },
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: generateFakeDate(45),
    type: 'image',
    image,
  },
  {
    fromMe: true,
    dateTime: generateFakeDate(34),
    type: 'text',
    body: 'Круто!',
    status: 'read',
  },
  {
    fromMe: true,
    dateTime: generateFakeDate(22),
    type: 'text',
    body: 'Пиши еще!',
    status: 'sent',
  },
];

export class Messenger extends Component {
  constructor({ chat }: { chat: ChatModel }) {
    super({
      chat,
      messages: messages.map((message) => new Message(message)),
      messageForm: new MessageForm(),
    });
  }

  render(): DocumentFragment {
    Button();

    // TODO: Trigger after render
    setTimeout(() => {
      const objDiv = document.getElementsByClassName('messenger__body');
      objDiv[0].scrollTop = objDiv[0].scrollHeight;
    }, 200);

    return this.compile(template, this.props);
  }
}
