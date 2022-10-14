"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Messenger.scss");
const types_1 = require("components/Button/types");
const Component_1 = __importDefault(require("core/Component"));
const registerComponent_1 = __importDefault(require("core/registerComponent"));
const fakeData_1 = require("../../../../utils/fakeData");
const Message_1 = __importDefault(require("../Message"));
const MessageForm_1 = __importDefault(require("../MessageForm"));
const types_2 = require("./../../../../components/Button/types");
(0, registerComponent_1.default)(MessageForm_1.default);
(0, registerComponent_1.default)(Message_1.default);
class Messenger extends Component_1.default {
    constructor({ chat }) {
        super({
            chat,
            messages: fakeData_1.fakeMessages,
        });
    }
    scrollToBottom() {
        const objDiv = document.getElementsByClassName('messenger__body');
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    render() {
        if (!this.props.chat) {
            //template=hbs
            return `
        <div class='messenger'>
          <div class='messenger__empty messenger__empty_centered'>
            <p class='messenger__alert'>
              Выберите чат чтобы отправить сообщение
            </p>
          </div>
        </div>
      `;
        }
        //template=hbs
        return `
      <div class='messenger'>
        <div class='messenger__header'>
          <div class='messenger__chat-info'>
              <span class='messenger__chat-avatar'
                {{#if chat.avatar}}style='background-image:url({{chat.avatar}})'{{/if}}></span>
              <span class='messenger__chat-name'>{{chat.name}}</span>
          </div>
          <div class='messenger__actions'>
            {{#Button style='${types_2.ButtonStyle.ICON}' type='${types_1.ButtonType.BUTTON}'
              classes='messenger__dots-button'}}
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            {{/Button}}
          </div>
        </div>
        <div class='messenger__body custom-scrollbar'>
          <div class='messenger__inner'>
            <div class='messenger__message-list'>
              {{#each messages}}
                {{{Message item=this}}}
              {{/each}}
            </div>
          </div>
        </div>
        <div class='messenger__footer'>
            {{{MessageForm}}}
        </div>
      </div>
    `;
    }
}
exports.default = Messenger;
Messenger.componentName = 'Messenger';
//# sourceMappingURL=Messenger.js.map