import './ChatList.scss';

import { ChatModel } from '../../';
import ChatListItem from '../ChatListItem';
import template from './ChatList.hbs';

type ChatListProps = {
  chats: ChatModel[];
  activeChatId: string;
};

export const ChatList = ({ chats, activeChatId }: ChatListProps) => {
  const renderedChatListItems = chats.map((item) => {
    const selected = activeChatId === item.id;
    return ChatListItem({ ...item, selected });
  });

  const data = {
    chats: renderedChatListItems,
  };
  return template(data);
};
