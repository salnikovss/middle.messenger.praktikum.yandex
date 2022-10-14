"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./ChatListItem.scss");
const Component_1 = __importDefault(require("core/Component"));
class ChatListItem extends Component_1.default {
    constructor(_a) {
        var { onClick, activeChatId, chat } = _a, rest = __rest(_a, ["onClick", "activeChatId", "chat"]);
        super(Object.assign(Object.assign({}, rest), { chat,
            activeChatId, selected: activeChatId === chat.id, events: {
                click: () => {
                    if (this.props.activeChatId !== this.props.chat.id) {
                        if (onClick) {
                            onClick(this.props.chat.id);
                        }
                    }
                },
            } }));
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
              <time class='chat-list-item__date' datetime="{{chat.lastMessageTime}}">{{chat.lastMessageTime}}</time>
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
exports.default = ChatListItem;
ChatListItem.componentName = 'ChatListItem';
//# sourceMappingURL=ChatListItem.js.map