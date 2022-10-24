import './Chat.scss';

import Modal from 'components/Modal';
import { ROUTE_PATHS } from 'config/routes';
import { registerComponent } from 'core';
import Component from 'core/Component';
import { initAllChats } from 'services/messages';
import withStore from 'utils/withStore';

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
        this.refs.addChatModalRef instanceof Modal && this.refs.addChatModalRef.open();
      },
      onSearch: (searchTerm) => {
        // @ts-expect-error error because ChatList wrapped by withStore
        (this.refs.chatlistRef as ChatList).setProps({ filter: searchTerm });
      },
      closeAddChatModal: () => {
        this.refs.addChatModalRef instanceof Modal && this.refs.addChatModalRef.close();
      },
    });
  }

  componentDidMount(): void {
    this.props.store.dispatch(initAllChats);
  }

  componentDidUpdate(): boolean {
    return false;
  }

  render() {
    //template=hbs
    return `
      <div class='chat'>
        <aside class='chat__left-pane'>
          <div class='chat__top-links'>
            {{{Link text='Создать чат' class='chat__top-link' onClick=onAddChatClick }}}
            {{{Link text='Профиль' class='chat__top-link chat__profile-link' to='${ROUTE_PATHS.PROFILE}' }}}
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
            {{{CreateChatForm closeModal=closeAddChatModal}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default withStore(Chat);
