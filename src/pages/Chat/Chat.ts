import './Chat.scss';

import Component from '../../utils/Component';
import template from './Chat.hbs';
import { ChatModel } from './Chat.types';
import ChatList from './components/ChatList';
import Messenger from './components/Messenger';
import SearchBox from './components/SearchBox';

const chatList: ChatModel[] = [
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
const activeChatId = 'chat4';

export class Chat extends Component {
  constructor() {
    const activeChat = chatList.find((chat) => chat.id === activeChatId);

    const data = {
      searchBox: new SearchBox(),
      chatList: new ChatList({ chats: chatList, activeChatId }),
      messenger: new Messenger({
        chat: activeChat as ChatModel,
      }),
    };

    super(data);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
