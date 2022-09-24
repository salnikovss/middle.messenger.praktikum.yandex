export interface IChatListItemProps {
  item: ChatModel;
  activeChatId?: string;
  onClick: (chatId: string) => void;
}

export interface IChatListItemPropsWithEvents extends ChatModel, Omit<IChatListItemProps, 'onClick' | 'item'> {
  selected: boolean;
  activeChatId?: string;
  events: {
    click?: EventListener;
  };
}
