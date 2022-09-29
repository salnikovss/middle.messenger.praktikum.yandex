import './ChatListItem.scss';

import Component from 'core/Component';

import { ChatListItemProps, ChatListItemPropsWithEvents } from './types';

export class ChatListItem extends Component<ChatListItemPropsWithEvents> {
  static componentName = 'ChatListItem';

  constructor({ onClick, activeChatId, chat, ...rest }: ChatListItemProps) {
    super({
      ...rest,
      chat,
      activeChatId,
      selected: activeChatId === chat.id,
      events: {
        click: () => {
          if (this.props.activeChatId !== this.props.chat.id) {
            if (onClick) {
              onClick(this.props.chat.id as string);
            }
          }
        },
      },
    });
  }

  render() {
    //template=hbs
    return `
      <div class='chat-list-item {{#if selected}}chat-list-item_selected{{/if}}' data-id='{{chat.id}}'>
        <div class='chat-list-item__avatar'>
          <span class='chat-list-item__avatar-image'
              {{#if chat.avatar}}style='background-image:url({{chat.avatar}})'{{/if}}></span>
        </div>

        <div class='chat-list-item__data'>
          <div class='chat-list-item__row'>
              <p class='chat-list-item__name'>{{chat.name}}</p>
              <p class='chat-list-item__date'>{{chat.lastMessageTime}}</p>
          </div>

          <div class='chat-list-item__row chat-list-item__row_full-height'>
              <p class='chat-list-item__alt'>{{chat.alt}}</p>
              <p class='chat-list-item__unread-count'>
                  {{#if chat.unreadMessages}}
                      <span>{{chat.unreadMessages}}</span>
                  {{/if}}
              </p>
          </div>
        </div>
      </div>
    `;
  }
}
