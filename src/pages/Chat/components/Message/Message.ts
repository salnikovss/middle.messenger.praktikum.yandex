import './Message.scss';

import Component from '../../../../core/Component';
import { IMessageProps } from './types';

export class Message extends Component<IMessageProps> {
  static componentName = 'Message';
  constructor({ item }: { item: IMessageProps }) {
    super({ ...item });
  }

  render() {
    return `
      <div class='message message_type-{{type}} message_{{#if fromMe}}from-me{{else}}from-others{{/if}}'>
        <div class='message__body'>
          {{#if image}}
            <img src='{{image}}' alt='' />
          {{else}}
            {{#unless fromMe}}
              {{#if author}}
              <p class='message__author'>{{author.name}}</p>
              {{/if}}
            {{/unless}}
            {{{nl2br body}}}
          {{/if}}
        </div>
        <div class='message__meta'>
          <span class='message__time'>{{getTime dateTime}}</span>
          {{#if status}}<span class='message__status message__status-{{status}}'></span>{{/if}}
        </div>
      </div>
    `;
  }
}
