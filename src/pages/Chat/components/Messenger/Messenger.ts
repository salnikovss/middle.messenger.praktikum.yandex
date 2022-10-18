import './Messenger.scss';

import { ButtonType } from 'components/Button/types';
import Modal from 'components/Modal';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import { deleteChat } from 'services/chat';
import withStore from 'utils/withStore';

import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { fakeMessages } from '../../../../utils/fakeData';
import isEqual from '../../../../utils/isEqual';
import AddUserForm from '../AddUserForm';
import DeleteUserForm from '../DeleteUserForm';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ButtonStyle } from './../../../../components/Button/types';
import { MessengerProps } from './types';

registerComponent(AddUserForm);
registerComponent(DeleteUserForm);
registerComponent(MessageForm);
registerComponent(Message);

class Messenger extends Component<MessengerProps> {
  static componentName = 'Messenger';

  constructor(props: MessengerProps) {
    super({
      ...props,
      messages: fakeMessages,
      onDeleteChatClick: (e) => {
        e.preventDefault();
        (this.refs.deleteChatModalRef as unknown as ConfirmationModal).open();
      },
      onDeleteUserClick: (e) => {
        e.preventDefault();
        (this.refs.deleteUserToChatModalRef as unknown as Modal).open();
      },
      onAddUserClick: (e) => {
        e.preventDefault();
        (this.refs.addUserToChatModalRef as unknown as Modal).open();
      },
      closeAddUserToChatModal: () => {
        (this.refs.addUserToChatModalRef as unknown as Modal).close();
      },
      onDeleteChatConfirm: () => {
        const { store } = this.props;
        const chatId = store.getState().idParam;
        if (chatId) {
          store.dispatch(deleteChat, { chatId });
        }
      },
    });
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

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    const oldChat = oldProps.chat && oldProps.chat();
    const newChat = newProps.chat && newProps.chat();

    return !isEqual(oldChat || {}, newChat || {});
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
              {{{Link
                class='dropdown__item'
                text='<i class="i i_plus"></i><span>Добавить пользователя</span>'
                onClick=onAddUserClick
              }}}
              {{{Link
                class='dropdown__item'
                text='<i class="i i_cross"></i><span>Удалить пользователя</span>'
                onClick=onDeleteUserClick
              }}}
              {{{Link
                class='dropdown__item'
                text='<i class="i i_trash"></i><span>Удалить чат</span>'
                onClick=onDeleteChatClick
              }}}
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

        {{{ConfirmationModal
            title='Вы уверены что хотите удалить этот чат?'
            ref='deleteChatModalRef'
            onConfirm=onDeleteChatConfirm
        }}}

        {{#Modal title='Добавить пользователя в чат' ref='addUserToChatModalRef'}}
          {{{AddUserForm closeModal=closeAddUserToChatModal}}}
          {{/Modal}}

        {{#Modal title='Удалить пользователя из чата' ref='deleteUserToChatModalRef'}}
          {{{DeleteUserForm closeModal=closeAddUserToChatModal}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default withStore(Messenger);
