import './ChatListItem.scss';

import Component from 'core/Component';

import { IChatListItemProps, IChatListItemPropsWithEvents } from './types';

export class ChatListItem extends Component<IChatListItemPropsWithEvents> {
  static componentName = 'ChatListItem';

  constructor({ onClick, activeChatId, item }: IChatListItemProps) {
    super({
      ...item,
      activeChatId,
      selected: activeChatId === item.id,
      events: {
        click: () => {
          if (this.props.activeChatId !== this.props.id) {
            onClick(this.props.id);
          }
        },
      },
    });
  }

  render() {
    return `
      <div class='chat-list-item {{#if selected}}chat-list-item_selected{{/if}}' data-id='{{id}}'>
        <div class='chat-list-item__avatar'>
          <span class='chat-list-item__avatar-image' 
              {{#if avatar}}style='background-image:url({{avatar}})'{{/if}}></span>
        </div>

        <div class='chat-list-item__data'>
          <div class='chat-list-item__row'>
              <p class='chat-list-item__name'>{{name}}</p>
              <p class='chat-list-item__date'>{{lastMessageTime}}</p>  
          </div>

          <div class='chat-list-item__row chat-list-item__row_full-height'>
              <p class='chat-list-item__alt'>{{alt}}</p>
              <p class='chat-list-item__unread-count'>
                  {{#if unreadMessages}}
                      <span>{{unreadMessages}}</span>
                  {{/if}} 
              </p>   
          </div>
        </div>
      </div>
    `;
  }
}
