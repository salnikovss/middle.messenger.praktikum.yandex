import './Chat.scss';

import Component from '../../utils/Component';
import { fakeActiveChatId, fakeChatList } from '../../utils/fakeData';
import template from './Chat.hbs';
import ChatList from './components/ChatList';
import Messenger from './components/Messenger';
import SearchBox from './components/SearchBox';
import { ChatModel } from './types';

export class Chat extends Component {
  render(): DocumentFragment {
    const activeChat = fakeChatList.find((chat) => chat.id === fakeActiveChatId);

    return this.compile(template, {
      searchBox: new SearchBox(),
      chatList: new ChatList({ chats: fakeChatList, activeChatId: fakeActiveChatId }),
      messenger: new Messenger({
        chat: activeChat as ChatModel,
      }),
    });
  }
}
