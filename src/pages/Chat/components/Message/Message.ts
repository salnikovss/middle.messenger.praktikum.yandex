import './Message.scss';

import Component from 'core/Component';
import getTime from 'utils/getTime';

import { MessageProps } from './types';

export default class Message extends Component<MessageProps> {
  static componentName = 'Message';

  render() {
    //template=hbs
    return `
      <div class='message message_type-{{item.type}} message_{{#if item.from_me}}from-me{{else}}from-others{{/if}}'>
        <div class='message__body'>
          {{#if item.image}}
            <img src='{{item.image}}'
              alt='{{#if item.user}}
                {{#if item.user.display_name}}
                  {{item.user.display_name}}
                {{else}}
                  {{item.user.first_name}} {{item.user.second_name}}
                {{/if}}
              {{/if}}' />
          {{else}}
            {{#unless item.from_me}}
              {{#if item.user}}
              <p class='message__author'>
                {{#if item.user.display_name}}
                  {{item.user.display_name}}
                {{else}}
                  {{item.user.first_name}} {{item.user.second_name}}
                {{/if}}
              </p>
              {{/if}}
            {{/unless}}
            {{item.content}}
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
