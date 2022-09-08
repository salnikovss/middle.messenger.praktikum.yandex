import template from './ChatListItem.hbs';
import './ChatListItem.scss';

export const ChatListItem = (item) => {
  const data = { ...item };
  return template(data);
};
