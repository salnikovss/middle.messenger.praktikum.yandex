import template from './Messenger.hbs';
import './Messenger.scss';
import Button from '../../../../components/Button';
import MessageForm from './components/MessageForm';
import image from '../../../../../static/images/camera-image.jpg';
import Message from './components/Message';

const date = new Date();
const messages = [
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: date.setHours(date.getHours() - 1),
    type: 'text',
    body: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
  },
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: date.setMinutes(date.getMinutes() - 40),
    type: 'image',
    image,
  },
  {
    fromMe: true,
    dateTime: date.setMinutes(date.getMinutes() - 30),
    type: 'text',
    body: 'Круто!',
    status: 'read',
  },
  {
    fromMe: true,
    dateTime: date.setMinutes(date.getMinutes() - 20),
    type: 'text',
    body: 'Пиши еще!',
    status: 'sent',
  },
];

export const Messenger = ({ chat }) => {
  Button();
  MessageForm();
  Message();

  const data = { chat, messages };
  return template(data);
};
