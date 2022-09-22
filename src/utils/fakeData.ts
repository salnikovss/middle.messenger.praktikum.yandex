import image from '../../static/images/camera-image.jpg';
import { ChatModel } from '../pages/Chat';

const generateFakeDate = (() => {
  const date = new Date();
  return (adjustMinutes: number) => {
    date.setMinutes(date.getMinutes() - adjustMinutes);
    return date;
  };
})();

export const fakeMessages = [
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

export const fakeChatList: ChatModel[] = [
  {
    id: 'chat1',
    name: 'Андрей',
    alt: 'Изображение',
    lastMessageTime: '10:49',
    unreadMessages: 2,
    avatar: null,
  },
  {
    id: 'chat2',
    name: 'Киноклуб',
    alt: 'Стикер',
    lastMessageTime: '12:00',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat3',
    name: 'Илья',
    alt: 'Друзья, у меня для вас особенный выпуск новостей!...',
    lastMessageTime: '15:12',
    unreadMessages: 40,
    avatar: null,
  },
  {
    id: 'chat4',
    name: 'Вадим',
    alt: 'Круто',
    lastMessageTime: 'Пт',
    unreadMessages: 230,
    avatar: null,
  },
  {
    id: 'chat5',
    name: 'тет-а-теты',
    alt: 'И Human Interface Guidelines и Material Design рекомендуют...',
    lastMessageTime: 'Ср',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat6',
    name: '1, 2, 3',
    alt: 'Миллионы россиян ежедневно проводят десятки часов свое...',
    lastMessageTime: 'Пн',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat7',
    name: 'Design Destroyer',
    alt: 'В 2008 году художник Jon Rafman  начал собирать...',
    lastMessageTime: 'Пн',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat8',
    name: 'Day.',
    alt: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
    lastMessageTime: '1 Мая 2020',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat9',
    name: 'тет-а-теты',
    alt: 'И Human Interface Guidelines и Material Design рекомендуют...',
    lastMessageTime: 'Ср',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat10',
    name: '1, 2, 3',
    alt: 'Миллионы россиян ежедневно проводят десятки часов свое...',
    lastMessageTime: 'Пн',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat11',
    name: 'Design Destroyer',
    alt: 'В 2008 году художник Jon Rafman  начал собирать...',
    lastMessageTime: 'Пн',
    unreadMessages: 0,
    avatar: null,
  },
  {
    id: 'chat12',
    name: 'Day.',
    alt: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
    lastMessageTime: '1 Мая 2020',
    unreadMessages: 0,
    avatar: null,
  },
];

export const fakeActiveChatId = 'chat4';

export const fakeUserData = {
  display_name: 'Иван',
  first_name: 'Иван',
  second_name: 'Иванов',
  login: 'ivanivanov',
  email: 'pochta@yandex.ru',
  phone: '+7 (909) 967 30 30',
};
