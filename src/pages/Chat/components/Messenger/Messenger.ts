import './Messenger.scss';

import { ButtonType } from 'components/Button/types';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import withStore from 'utils/withStore';

import { fakeMessages } from '../../../../utils/fakeData';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ButtonStyle } from './../../../../components/Button/types';
import { MessengerProps } from './types';

registerComponent(MessageForm);
registerComponent(Message);

class Messenger extends Component<MessengerProps> {
  static componentName = 'Messenger';

  constructor(props: MessengerProps) {
    super({ ...props, messages: fakeMessages });
    const state = this.props.store.getState();
    this.setProps({
      chat: () => {
        if (state.idParam) {
          return this.props.store.getState().chats?.find((chat) => chat.id === state.idParam);
        }
        return null;
      },
    });
  }

  scrollToBottom() {
    const objDiv = this.element?.querySelector('.messenger__body');

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    if (!this.props.store.getState().idParam) {
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
                {{#if chat.avatar}}style='background-image:url({{chat.avatar}})'{{/if}}>
              </span>
              <span class='messenger__chat-name'>{{chat.title}}</span>
          </div>
          <div class='messenger__actions'>
            {{#Button style='${ButtonStyle.ICON}' type='${ButtonType.BUTTON}'
              className='messenger__dots-button'}}
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

export default withStore(Messenger);
