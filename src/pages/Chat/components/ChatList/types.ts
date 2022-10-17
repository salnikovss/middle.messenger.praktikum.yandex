import { ChatListItemProps } from '../ChatListItem/types';

export type ChatListProps = {
  onClick: (chatId: string) => void;
  chats: ChatListItemProps[];
  activeChatId: string;
};
