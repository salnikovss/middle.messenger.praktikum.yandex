import './Chat.scss';

import Modal from 'components/Modal';
import { routeConsts } from 'config/routes';
import { registerComponent } from 'core';
import Component from 'core/Component';
import withStore from 'utils/withStore';

import withUser from '../../utils/withUser';
import ChatList from './components/ChatList';
import CreateChatForm from './components/CreateChatForm';
import Messenger from './components/Messenger';
import SearchBox from './components/SearchBox';
import { ChatProps } from './types';

registerComponent(SearchBox);
registerComponent(ChatList);
registerComponent(Messenger);
registerComponent(CreateChatForm);

class Chat extends Component<ChatProps> {
  static componentName = 'Chat';

  constructor(props: ChatProps) {
    // const activeChatId = fakeActiveChatId;
    // const activeChat = chatList.find((chat) => chat.id === activeChatId);

    super({
      ...props,
      onAddChatClick: (e) => {
        e.preventDefault();
        (this.refs.addChatModalRef as unknown as Modal).open();
      },
      // activeChat,
    });

    this.setProps({
      chatList: () => {
        return this.props.store.getState().chats?.map((chat) => {
          return { ...chat, onClick: (chatId: number) => this.onChatClick(chatId) };
        });
      },
      // activeChatId: () => this.props.store.getState().chats,
    });
  }

  onChatClick = (chatId: number) => {
    // this.setProps({ activeChatId: chatId });
    window.router.go(`${routeConsts.CHAT}/${chatId}`);
  };

  render() {
    //template=hbs
    return `
      <div class='chat'>
        <aside class='chat__left-pane'>
          <div class='chat__top-links'>
            {{{Link text='Создать чат' class='chat__top-link' onClick=onAddChatClick }}}
            {{{Link text='Профиль' class='chat__top-link chat__profile-link' to='${routeConsts.PROFILE}' }}}
          </div>
          <div class='chat__search-box'>
            {{{SearchBox}}}
          </div>
          <div class='chat__chat-list custom-scrollbar'>
              {{{ChatList chats=chatList activeChatId=activeChatId ref='chatListRef'}}}
          </div>
        </aside>
        <div class='chat__right-pane'>
          {{{Messenger chat=activeChat}}}
        </div>

        {{#Modal title='Создать чат' ref='addChatModalRef'}}
            {{{CreateChatForm}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default withStore(withUser(Chat));
