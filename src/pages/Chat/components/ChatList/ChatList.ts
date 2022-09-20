import './ChatList.scss';

import Component from '../../../../utils/Component';
import { ChatModel } from '../../';
import ChatListItem from '../ChatListItem';
import template from './ChatList.hbs';

type ChatListProps = {
  chats: ChatModel[];
  activeChatId: string;
};

export class ChatList extends Component {
  constructor({ chats, activeChatId }: ChatListProps) {
    const renderedChatListItems = chats.map((item) => {
      const selected = activeChatId === item.id;
      return new ChatListItem({ ...item, selected });
    });

    const data = {
      chats: renderedChatListItems,
    };
    super(data);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
