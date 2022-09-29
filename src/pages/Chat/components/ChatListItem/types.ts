export type ChatListItemProps = {
  chat: ChatModel;
  activeChatId?: string;
  onClick?: (chatId: string) => void;
};

export type ChatListItemPropsWithEvents = Omit<ChatListItemProps, 'onClick'> & {
  selected: boolean;
  events: {
    click: (e: Event) => void;
  };
};
