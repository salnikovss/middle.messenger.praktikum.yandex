import './ChatListItem.scss';

import Component from '../../../../utils/Component';
import template from './ChatListItem.hbs';
import { ChatListItemProps } from './types';

export class ChatListItem extends Component {
  constructor(item: ChatListItemProps) {
    super(item);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
