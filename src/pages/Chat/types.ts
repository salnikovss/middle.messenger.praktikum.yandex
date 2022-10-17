import { Store } from 'core';

export type ChatProps = {
  chatList: ChatModel[];
  activeChatId: string;
  activeChat?: Nullable<ChatModel>;
  store: Store<AppState>;
  user: Nullable<UserModel>;
  onAddChatClick?: (e: MouseEvent) => void;
};
