import './Chat.scss';

import Modal from 'components/Modal';
import { routeConsts } from 'config/routes';
import { registerComponent } from 'core';
import Component from 'core/Component';

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
    super({
      ...props,
      onAddChatClick: (e) => {
        e.preventDefault();
        (this.refs.addChatModalRef as unknown as Modal).open();
      },
      onSearch: (searchTerm) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (this.refs.chatlistRef as unknown as ChatList).setProps({ filter: searchTerm });
      },
    });
  }

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
            {{{SearchBox onSearch=onSearch}}}
          </div>
          <div class='chat__chat-list custom-scrollbar'>
              {{{ChatList ref='chatlistRef'}}}
          </div>
        </aside>
        <div class='chat__right-pane'>
          {{{Messenger}}}
        </div>

        {{#Modal title='Создать чат' ref='addChatModalRef'}}
            {{{CreateChatForm}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default Chat;
