"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Message.scss");
const Component_1 = __importDefault(require("core/Component"));
const utils_1 = require("utils");
const nl2br_1 = __importDefault(require("utils/nl2br"));
class Message extends Component_1.default {
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
            ${(0, nl2br_1.default)(this.props.item.body || '', false)}
          {{/if}}
        </div>
        <div class='message__meta'>
          <span class='message__time'>${(0, utils_1.getTime)(this.props.item.dateTime)}</span>
          {{#if item.status}}<span class='message__status message__status-{{item.status}}'></span>{{/if}}
        </div>
      </div>
    `;
    }
}
exports.default = Message;
Message.componentName = 'Message';
//# sourceMappingURL=Message.js.map