import { ChatModel } from '../../types';

export type ChatListItemProps = ChatModel & {
  selected: boolean;
};
