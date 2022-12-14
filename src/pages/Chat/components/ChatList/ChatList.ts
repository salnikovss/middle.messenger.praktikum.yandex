import './ChatList.scss';

import { ROUTE_PATHS } from 'config/routes';
import { Component } from 'core';
import registerComponent from 'core/registerComponent';
import withStore from 'utils/withStore';

import { markAsRead } from '../../../../services/messages';
import ChatListItem from '../ChatListItem';
import { ChatListItemProps } from '../ChatListItem/types';
import { ChatListProps } from './types';

registerComponent(ChatListItem);

class ChatList extends Component<ChatListProps> {
  static componentName = 'ChatList';

  constructor(props: ChatListProps) {
    super(props);

    this.setProps({
      chats: () =>
        this.props.store
          .getState()
          .chats?.filter((chat) => !this.props.filter || chat.title.search(this.props.filter) > -1)
          .map((chat) => {
            return {
              ...chat,
              onClick: (chatId: number) => this.onClick(chatId),
            } as unknown as ChatListItemProps;
          }),
    });
  }

  onClick = (chatId: number) => {
    this.props.store.dispatch(markAsRead, { chatId });
    window.router.go(`${ROUTE_PATHS.CHAT}/${chatId}`);
  };

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

export default withStore(ChatList);
