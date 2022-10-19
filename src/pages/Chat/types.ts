import { Store } from 'core';

export type ChatProps = {
  store: Store<AppState>;
  chatList: ChatModel[];
  onSearch: (searchTerm: string) => void;
  onAddChatClick?: (e: MouseEvent) => void;
  closeAddChatModal: () => void;
};
