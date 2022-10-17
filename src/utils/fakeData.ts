import image from '../../static/images/camera-image.jpg';
import { MessageStatus, MessageType } from '../pages/Chat/components/Message/types';

const generateFakeDate = (() => {
  const date = new Date();
  return (adjustMinutes: number) => {
    date.setMinutes(date.getMinutes() - adjustMinutes);
    return date;
  };
})();

export const fakeMessages: MessageModel[] = [
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: generateFakeDate(60),
    type: MessageType.TEXT,
    body: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
  },
  {
    author: {
      avatar: null,
      name: 'Вадим',
    },
    dateTime: generateFakeDate(45),
    type: MessageType.IMAGE,
    image,
  },
  {
    fromMe: true,
    dateTime: generateFakeDate(34),
    type: MessageType.TEXT,
    body: 'Круто!',
    status: MessageStatus.READ,
  },
  {
    fromMe: true,
    dateTime: generateFakeDate(22),
    type: MessageType.TEXT,
    body: 'Пиши еще!',
    status: MessageStatus.SENT,
  },
];
