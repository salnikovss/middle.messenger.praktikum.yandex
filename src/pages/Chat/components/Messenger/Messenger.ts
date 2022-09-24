import './Messenger.scss';

import Component from 'core/Component';
import registerComponent from 'core/registerComponent';

import { ButtonType } from '../../../../components/Button/types';
import { fakeMessages } from '../../../../utils/fakeData';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ButtonStyle } from './../../../../components/Button/types';
import { IMessengerProps } from './types';

export class Messenger extends Component<IMessengerProps> {
  static componentName = 'Messenger';

  constructor({ chat }: IMessengerProps) {
    registerComponent(MessageForm);
    registerComponent(Message);

    super({
      chat,
      messages: fakeMessages,
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
    // TODO: Trigger after render
    // setTimeout(() => {
    //   const objDiv = document.getElementsByClassName('messenger__body');
    //   objDiv[0].scrollTop = objDiv[0].scrollHeight;
    // }, 200);

    if (!this.props.chat) {
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

    return `
      <div class='messenger'>
        <div class='messenger__header'>
          <div class='messenger__chat-info'>
              <span class='messenger__chat-avatar' 
                {{#if chat.avatar}}style='background-image:url({{chat.avatar}})'{{/if}}></span>
              <span class='messenger__chat-name'>{{chat.name}}</span>
          </div>
          <div class='messenger__actions'>
            {{{Button style='${ButtonStyle.ICON}' type='${ButtonType.BUTTON}' 
              classes='messenger__dots-button'
              body='<span class="dot"></span><span class="dot"></span><span class="dot"></span>'
            }}}
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
