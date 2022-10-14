"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Chat.scss");
const routes_1 = require("config/routes");
const core_1 = require("core");
const Component_1 = __importDefault(require("core/Component"));
const fakeData_1 = require("../../utils/fakeData");
const ChatList_1 = __importDefault(require("./components/ChatList"));
const Messenger_1 = __importDefault(require("./components/Messenger"));
const SearchBox_1 = __importDefault(require("./components/SearchBox"));
(0, core_1.registerComponent)(SearchBox_1.default);
(0, core_1.registerComponent)(ChatList_1.default);
(0, core_1.registerComponent)(Messenger_1.default);
class Chat extends Component_1.default {
    constructor() {
        const chatList = fakeData_1.fakeChatList;
        const activeChatId = fakeData_1.fakeActiveChatId;
        const activeChat = chatList.find((chat) => chat.id === activeChatId);
        super({
            chatList,
            activeChatId,
            activeChat,
        });
    }
    render() {
        //template=hbs
        return `
      <div class='chat'>
        <aside class='chat__left-pane'>
          {{{Link text='Профиль' class='chat__profile-link' to='${routes_1.routeConsts.PROFILE}' }}}
          <div class='chat__search-box'>
            {{{SearchBox}}}
          </div>
          <div class='chat__chat-list custom-scrollbar'>
            {{{ChatList chats=chatList activeChatId=activeChatId}}}
          </div>
        </aside>
        <div class='chat__right-pane'>
          {{{Messenger chat=activeChat}}}
        </div>
      </div>
    `;
    }
}
exports.default = Chat;
Chat.componentName = 'Chat';
//# sourceMappingURL=Chat.js.map