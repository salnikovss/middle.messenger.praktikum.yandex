import ChatListItem from '../ChatListItem';
import template from './ChatList.hbs';
import './ChatList.scss';

export const ChatList = ({ chats, activeChatId }) => {
  const renderedChatListItems = chats.map((item) => {
    const selected = activeChatId === item.id;
    return ChatListItem({ ...item, selected });
  });

  const data = {
    chats: renderedChatListItems,
  };
  return template(data);
};
