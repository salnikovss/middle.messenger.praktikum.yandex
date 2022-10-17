import './ChatList.scss';

import { routeConsts } from 'config/routes';
import { Component } from 'core';
import registerComponent from 'core/registerComponent';
import withStore from 'utils/withStore';

import ChatListItem from '../ChatListItem';
import { ChatListItemProps } from '../ChatListItem/types';
import { ChatListProps } from './types';

registerComponent(ChatListItem);
class ChatList extends Component<ChatListProps> {
  static componentName = 'ChatList';

  constructor(props: ChatListProps) {
    super(props);

    const { chats } = this.props.store.getState();
    this.setProps({
      chats: () =>
        chats?.map((chat) => {
          return {
            ...chat,
            onClick: (chatId: number) => this.onClick(chatId),
          } as unknown as ChatListItemProps;
        }),
    });
  }

  onClick = (chatId: number) => {
    window.router.go(`${routeConsts.CHAT}/${chatId}`);
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
