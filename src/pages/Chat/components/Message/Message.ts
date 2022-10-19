import './Message.scss';

import Component from 'core/Component';
import getTime from 'utils/getTime';
import nl2br from 'utils/nl2br';

import { MessageProps } from './types';

export default class Message extends Component<MessageProps> {
  static componentName = 'Message';

  render() {
    // chat_id: 374;
    // content: '5555555';
    // file: null;
    // id: 1;
    // is_read: true;
    // time: '2022-10-19T21:54:15+00:00';
    // type: 'message';
    // user_id: 33482;

    //template=hbs
    return `
      <div class='message message_type-{{item.type}} message_{{#if item.from_me}}from-me{{else}}from-others{{/if}}'>
        <div class='message__body'>
          {{#if item.image}}
            <img src='{{item.image}}' alt='{{#if item.author}}{{item.author.name}}{{else}}твой аватар{{/if}}' />
          {{else}}
            {{#unless item.from_me}}
              {{#if item.user_id}}
              <p class='message__author'>{{item.user_id}} {{item.author.name}}</p>
              {{/if}}
            {{/unless}}
            ${nl2br(this.props.item.content || '', false)}
          {{/if}}
        </div>
        <div class='message__meta'>
          <span class='message__time'>${getTime(this.props.item.time)}</span>
          {{#if item.is_read}}
             <span class='message__status message__status-read'></span>
          {{/if}}
        </div>
      </div>
    `;
  }
}
