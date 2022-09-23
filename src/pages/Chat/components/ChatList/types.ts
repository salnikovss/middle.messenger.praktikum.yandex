import { IChatListItemProps } from '../ChatListItem/types';

export interface IChatListProps {
  onClick: (chatId: string) => void;
  chats: IChatListItemProps[];
  activeChatId: string;
}
