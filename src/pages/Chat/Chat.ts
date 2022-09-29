import './Chat.scss';

import { routeConsts } from 'config/routes';
import { registerComponent } from 'core';
import Component from 'core/Component';

import { fakeActiveChatId, fakeChatList } from '../../utils/fakeData';
import ChatList from './components/ChatList';
import { Messenger } from './components/Messenger/Messenger';
import SearchBox from './components/SearchBox';
import { ChatProps } from './types';

export class Chat extends Component<ChatProps> {
  static componentName = 'Chat';

  constructor() {
    const chatList = fakeChatList;
    const activeChatId = fakeActiveChatId;
    const activeChat = chatList.find((chat) => chat.id === activeChatId);

    registerComponent(SearchBox);
    registerComponent(ChatList);
    registerComponent(Messenger);

    super({
      chatList,
      activeChatId,
      activeChat,
    });
  }

  render() {
    //template=hbs
    return `
      <div class='chat'>
        <aside class='chat__left-pane'>
          {{{Link text='Профиль' class='chat__profile-link' to='${routeConsts.PROFILE}' }}}
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
