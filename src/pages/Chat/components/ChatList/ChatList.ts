import './ChatList.scss';

import { Component } from 'core';
import registerComponent from 'core/registerComponent';

import ChatListItem from '../ChatListItem';
import { ChatListProps } from './types';

registerComponent(ChatListItem);
class ChatList extends Component<ChatListProps> {
  static componentName = 'ChatList';

  constructor(props: ChatListProps) {
    super(props);
  }

  render() {
    //template=hbs
    return `
      <ul class='chat-list'>
        {{#each chats}}
          <li class='chat-list__item'>
              {{{ChatListItem chat=this onClick=this.onClick }}}
          </li>
        {{/each}}
      </ul>
    `;
  }
}
export default ChatList;
