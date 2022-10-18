export type ChatProps = {
  chatList: ChatModel[];
  onSearch: (searchTerm: string) => void;
  onAddChatClick?: (e: MouseEvent) => void;
};
