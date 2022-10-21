import { Store } from 'core';

import { ChatListItemProps } from '../ChatListItem/types';

export type ChatListProps = {
  filter: string;
  onClick: (chatId: number) => void;
  store: Store<AppState>;
  chats?: () => ChatListItemProps[] | undefined;
};
