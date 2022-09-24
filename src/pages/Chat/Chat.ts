import './Chat.scss';

import { registerComponent } from 'core';
import Component from 'core/Component';

import { fakeActiveChatId, fakeChatList } from '../../utils/fakeData';
import ChatList from './components/ChatList';
import { Messenger } from './components/Messenger/Messenger';
import SearchBox from './components/SearchBox';
import { IChatProps } from './types';

export class Chat extends Component<IChatProps> {
  static componentName = 'Chat';

  constructor() {
    const chatList = fakeChatList;
    const activeChatId = fakeActiveChatId;
    const activeChat = chatList.find((chat) => chat.id === activeChatId);

    super({
      chatList,
      activeChatId,
      activeChat,
    });
  }

  render() {
    registerComponent(SearchBox);
    registerComponent(ChatList);
    registerComponent(Messenger);

    //template=hbs
    return `
      <div class='chat'>
        <aside class='chat__left-pane'>
          <a class='chat__profile-link' href='{{routes 'PROFILE'}}'>Профиль</a>
          <div class='chat__search-box'>
            {{{SearchBox}}}
          </div>
          <div class='chat__chat-list custom-scrollbar'>
            {{{ChatList chats=chatList activeChatId=activeChatId}}}
          </div>
        </aside>
        <div class='chat__right-pane'>
          {{{Messenger chat=activeChat}}}
        </div>
      </div>
    `;
  }
}
