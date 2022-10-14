"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./ChatList.scss");
const Component_1 = __importDefault(require("core/Component"));
const registerComponent_1 = __importDefault(require("core/registerComponent"));
const ChatListItem_1 = __importDefault(require("../ChatListItem"));
(0, registerComponent_1.default)(ChatListItem_1.default);
class ChatList extends Component_1.default {
    constructor({ chats, activeChatId }) {
        super();
        this.onClick = (chatId) => {
            this.setProps({
                activeChatId: chatId,
            });
        };
        this.setProps({
            chats: chats.map((chat) => (Object.assign(Object.assign({}, chat), { onClick: this.onClick.bind(this) }))),
            activeChatId,
        });
    }
    render() {
        //template=hbs
        return `
      <ul class='chat-list'>
        {{#each chats}}
          <li class='chat-list__item'>
              {{{ChatListItem chat=this onClick=this.onClick activeChatId="${this.props.activeChatId}" }}}
          </li>
        {{/each}}
      </ul>
    `;
    }
}
exports.default = ChatList;
ChatList.componentName = 'ChatList';
//# sourceMappingURL=ChatList.js.map