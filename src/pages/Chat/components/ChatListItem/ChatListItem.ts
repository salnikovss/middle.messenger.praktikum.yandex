import './ChatListItem.scss';

import { Chat } from '../../Chat';
import template from './ChatListItem.hbs';

export type ChatListItemProps =
  | {
      selected: boolean;
    }
  | Chat;

export const ChatListItem = (item: ChatListItemProps) => {
  return template({ ...item });
};
