import { Store } from 'core';

import { ChatListItemProps } from '../ChatListItem/types';

export type ChatListProps = {
  onClick: (chatId: number) => void;
  store: Store<AppState>;
  chats?: () => ChatListItemProps[] | undefined;
};
