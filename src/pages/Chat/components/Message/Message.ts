import './Message.scss';

import Component from 'core/Component';
import getTime from 'utils/getTime';
import nl2br from 'utils/nl2br';

import { MessageProps } from './types';

export default class Message extends Component<MessageProps> {
  static componentName = 'Message';

  render() {
    //template=hbs
    return `
      <div class='message message_type-{{item.type}} message_{{#if item.fromMe}}from-me{{else}}from-others{{/if}}'>
        <div class='message__body'>
          {{#if item.image}}
            <img src='{{item.image}}' alt='{{#if item.author}}{{item.author.name}}{{else}}твой аватар{{/if}}' />
          {{else}}
            {{#unless item.fromMe}}
              {{#if item.author}}
              <p class='message__author'>{{item.author.name}}</p>
              {{/if}}
            {{/unless}}
            ${nl2br(this.props.item.body || '', false)}
          {{/if}}
        </div>
        <div class='message__meta'>
          <span class='message__time'>${getTime(this.props.item.dateTime)}</span>
          {{#if item.status}}<span class='message__status message__status-{{item.status}}'></span>{{/if}}
        </div>
      </div>
    `;
  }
}
