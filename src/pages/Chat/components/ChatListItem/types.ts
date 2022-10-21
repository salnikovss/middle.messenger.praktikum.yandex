import { Store } from 'core';

export type ChatListItemProps = {
  chat: ChatModel;
  selected: () => boolean;
  store: Store<AppState>;
  onClick?: (chatId: number) => void;
};

export type ChatListItemPropsWithEvents = Omit<ChatListItemProps, 'onClick'> & {
  events: {
    click: (e: Event) => void;
  };
};
