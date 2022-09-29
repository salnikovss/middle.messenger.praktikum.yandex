import './ChatList.scss';

import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import ChatListItem from '../ChatListItem';
import { ChatListProps } from './types';

export class ChatList extends Component<ChatListProps> {
  static componentName = 'ChatList';

  constructor({ chats, activeChatId }: ChatListProps) {
    registerComponent(ChatListItem);
    super();

    this.setProps({
      chats: chats.map((chat) => ({ ...chat, onClick: this.onClick.bind(this) })),
      activeChatId,
    });
  }

  onClick = (chatId: string) => {
    this.setProps({
      activeChatId: chatId,
    });
  };

  render() {
    //template=hbs
    return `
      <ul class='chat-list'>
        {{#each chats}}
          <li class='chat-list__item'>
              {{{ChatListItem chat=this onClick=this.onClick activeChatId="${this.props.activeChatId}" }}}
          </li>
        {{/each}}
      </ul>
    `;
  }
}
