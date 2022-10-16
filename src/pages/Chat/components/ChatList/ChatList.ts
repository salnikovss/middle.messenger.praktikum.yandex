import './ChatList.scss';

import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import ChatListItem from '../ChatListItem';
import { ChatListProps } from './types';

registerComponent(ChatListItem);
export default class ChatList extends Component<ChatListProps> {
  static componentName = 'ChatList';

  constructor({ chats, activeChatId, ...rest }: ChatListProps) {
    super({
      ...rest,
      chats: chats.map((chat) => {
        return { ...chat, onClick: (chatId: string) => this.onClick(chatId) };
      }),
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
