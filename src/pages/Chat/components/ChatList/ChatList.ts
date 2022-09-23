import './ChatList.scss';

import Component from '../../../../core/Component';
import registerComponent from '../../../../core/registerComponent';
import ChatListItem from '../ChatListItem';
import { IChatListProps } from './types';

export class ChatList extends Component<IChatListProps> {
  constructor({ chats, activeChatId }: IChatListProps) {
    registerComponent('ChatListItem', ChatListItem);
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
    return `
      <ul class='chat-list'>
        {{#each chats}}
          <li class='chat-list__item'>
              {{{ChatListItem item=this onClick=this.onClick activeChatId="${this.props.activeChatId}" }}}
          </li>
        {{/each}}
      </ul>
    `;
  }
}
