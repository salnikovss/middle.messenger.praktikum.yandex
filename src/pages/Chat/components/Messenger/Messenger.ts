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
    this.setProps({
      chat: () => {
        const state = this.props.store.getState();
        if (state.idParam) {
          return state.chats?.find((chat) => chat.id === state.idParam);
        }
        return null;
      },
    });

    this.props.store.on('changed', (prevState: AppState, nextState: AppState) => {
      // console.log(prevState.idParam, nextState.idParam, prevState.idParam !== nextState.idParam);

      if (prevState.idParam !== nextState.idParam) {
        // console.log(this);

        this.scrollToBottom();
      }
    });

    // this._eventBus.on(Component.EVENTS.FLOW_CDM, this.scrollToBottom.bind(this));
    //  this._eventBus.on(Component.EVENTS.FLOW_CDU, this.updateFormRefs.bind(this));
  }

  scrollToBottom() {
    const objDiv = this.element?.querySelector('.messenger__body');

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  render() {
    const chat = this.props.chat && this.props.chat();

    if (!chat) {
      //template=hbs
      return `
        <div class='messenger'>
          <div class='messenger__empty messenger__empty_centered'>
            <p class='messenger__alert'>Выберите чат чтобы отправить сообщение</p>
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
                ${chat.avatar && `style='background-image:url(${chat.avatar})'`}>
              </span>
              <span class='messenger__chat-name'>${chat.title}</span>
          </div>
          <div class='messenger__actions dropdown'>
            {{#Button style='${ButtonStyle.ICON}' type='${ButtonType.BUTTON}'
              className='messenger__dots-button dropdown__toggler'}}
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            {{/Button}}
            <div class="dropdown__items">
              {{{Link class='dropdown__item' text='<i class="i i_plus"></i><span>Добавить пользователя</span>'}}}
              {{{Link class='dropdown__item' text='<i class="i i_cross"></i><span>Удалить пользователя</span>'}}}
              {{{Link class='dropdown__item' text='<i class="i i_trash"></i><span>Удалить чат</span>'}}}
            </div>
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
