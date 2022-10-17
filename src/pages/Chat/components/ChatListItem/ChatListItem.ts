import './ChatListItem.scss';

import { Component } from 'core';
import withStore from 'utils/withStore';

import isEqual from '../../../../utils/isEqual';
import simplifyDate from '../../../../utils/simplifyDate';
import { ChatListItemProps, ChatListItemPropsWithEvents } from './types';

class ChatListItem extends Component<ChatListItemPropsWithEvents> {
  static componentName = 'ChatListItem';

  constructor({ onClick, activeChatId, chat, ...rest }: ChatListItemProps) {
    super({
      ...rest,
      chat,
      activeChatId,
      selected: activeChatId === chat.id,
      events: {
        click: () => {
          if (this.props.activeChatId !== this.props.chat.id && onClick) {
            onClick(this.props.chat.id);
          }
        },
      },
    });

    this.setProps({
      selected: () => chat.id === this.props.store.getState().idParam,
    });
  }

  componentDidUpdate(oldProps: ChatListItemPropsWithEvents, newProps: ChatListItemPropsWithEvents): boolean {
    return (
      oldProps.selected != newProps.selected ||
      !isEqual(oldProps.chat.last_message || {}, newProps.chat.last_message || {})
    );
  }

  render() {
    const { last_message } = this.props.chat;
    const date = last_message?.time ? simplifyDate(last_message.time) : null;

    //template=hbs
    return `
      <div class='chat-list-item {{#if selected}}chat-list-item_selected{{/if}}' data-id='{{chat.id}}'>
        <div class='chat-list-item__avatar'>
          <span class='chat-list-item__avatar-image'
              {{#if chat.avatar}}style='background-image:url({{chat.avatar}})'{{/if}}></span>
        </div>

        <div class='chat-list-item__data'>
          <div class='chat-list-item__row'>
              <p class='chat-list-item__name'>{{chat.title}}</p>
              {{#if chat.last_message}}
              <time class='chat-list-item__date' datetime="{{chat.last_message.time}}">
                ${date}
              </time>
              {{/if}}
          </div>

          <div class='chat-list-item__row chat-list-item__row_full-height'>
              <p class='chat-list-item__alt'>{{chat.last_message.content}}</p>
              <p class='chat-list-item__unread-count'>
                  {{#if chat.unread_count}}
                      <span>{{chat.unread_count}}</span>
                  {{/if}}
              </p>
          </div>
        </div>
      </div>
    `;
  }
}

export default withStore(ChatListItem);
