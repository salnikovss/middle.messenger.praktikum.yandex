import template from './Messenger.hbs';
import Button from '../../../../components/Button';
import image from '../../../../../static/images/camera-image.jpg';
import MessageForm from '../MessageForm';
import Message from '../Message';
import './Messenger.scss';

const generateFakeDate = (() => {
  const date = new Date();
  return (adjustMinutes) => {
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
    body: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
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

export const Messenger = ({ chat }) => {
  Button();
  MessageForm();
  Message();

  // TODO: Trigger after render
  setTimeout(() => {
    var objDiv = document.getElementsByClassName('messenger__body');
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
  }, 200);

  const data = { chat, messages };
  return template(data);
};
