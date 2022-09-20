import './ChatListItem.scss';

import Component from '../../../../utils/Component';
import { ChatModel } from '../../';
import template from './ChatListItem.hbs';

export type ChatListItemProps = ChatModel & {
  selected: boolean;
};

// export const ChatListItem = (item: ChatListItemProps) => {
//   return template({ ...item });
// };

export class ChatListItem extends Component {
  constructor(item: ChatListItemProps) {
    super(item);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
