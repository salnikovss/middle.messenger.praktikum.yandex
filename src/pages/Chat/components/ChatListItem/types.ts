import { Store } from 'core';

export type ChatListItemProps = {
  chat: ChatModel;
  activeChatId?: number;
  store: Store<AppState>;
  onClick?: (chatId: number) => void;
};

export type ChatListItemPropsWithEvents = Omit<ChatListItemProps, 'onClick'> & {
  selected: boolean;
  events: {
    click: (e: Event) => void;
  };
};
