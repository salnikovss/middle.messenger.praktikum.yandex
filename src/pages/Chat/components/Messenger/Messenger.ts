import './Messenger.scss';

import Modal from 'components/Modal';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import { deleteChat, deleteUsersFromChat } from 'services/chat';
import htmlEntities from 'utils/htmlEntities';
import isEqual from 'utils/isEqual';
import withStore from 'utils/withStore';

import { UserDTO } from '../../../../api/types';
import withUser from '../../../../utils/withUser';
import AddUserForm from '../AddUserForm';
import DeleteUserForm from '../DeleteUserForm';
import MessageForm from '../MessageForm';
import Messages from '../Messages';
import { ButtonStyle, ButtonType } from './../../../../components/Button/types';
import { MessengerProps } from './types';

registerComponent(AddUserForm);
registerComponent(DeleteUserForm);
registerComponent(MessageForm);
registerComponent(Messages);

class Messenger extends Component<MessengerProps> {
  static componentName = 'Messenger';

  constructor(props: MessengerProps) {
    super({
      ...props,
      onDeleteChatClick: (e) => {
        e.preventDefault();
        // @ts-expect-error error because ConfirmationModal wrapped by withStore
        (this.refs.deleteChatModalRef as unknown as ConfirmationModal).open();
      },
      onDeleteUserClick: (e) => {
        e.preventDefault();
        this.refs.deleteUserFromChatModalRef instanceof Modal && this.refs.deleteUserFromChatModalRef.open();
      },
      onAddUserClick: (e) => {
        e.preventDefault();
        this.refs.addUserToChatModalRef instanceof Modal && this.refs.addUserToChatModalRef.open();
      },
      closeAddUserToChatModal: () => {
        this.refs.addUserToChatModalRef instanceof Modal && this.refs.addUserToChatModalRef.close();
      },
      onDeleteChatConfirm: () => {
        const { store } = this.props;
        const chatId = store.getState().idParam;
        if (chatId) {
          store.dispatch(deleteChat, { chatId }, () => {
            // @ts-expect-error error because ConfirmationModal wrapped by withStore
            (this.refs.deleteChatModalRef as unknown as ConfirmationModal).close();
          });
        }
      },
      onDeleteUserModalShow: async (modal) => {
        const chatId = this.props.store.getState().idParam;

        if (!chatId) {
          return;
        }
        const chat = this.props.store.getState().chats?.find((chat) => chat.id === chatId);
        if (!chat) {
          return;
        }
        if (chat.chatUsers) {
          // @ts-expect-error error because DeleteUserForm wrapped by withStore
          (this.refs.deleteUserFormRef as unknown as DeleteUserForm).setProps({
            chatUsers: (chat.chatUsers as UserDTO[])
              .filter((user) => user.role !== 'admin')
              .map((user) => {
                return {
                  ...user,
                  onClick: () => {
                    const userId = user.id;
                    const chatId = this.props.store.getState().idParam;
                    if (chatId) {
                      this.props.store.dispatch(
                        deleteUsersFromChat,
                        { users: [userId], chatId },
                        modal.close.bind(modal)
                      );
                    }
                  },
                };
              }),
          });
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
  }

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    return !isEqual({ chat: oldProps.chat }, { chat: newProps.chat });
  }

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
              <span class='messenger__chat-name'>${htmlEntities(chat.title)}</span>
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
            {{{Messages className='messenger__message-list'}}}
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

        {{#Modal title='Удалить пользователя из чата' ref='deleteUserFromChatModalRef' onShow=onDeleteUserModalShow}}
          {{{DeleteUserForm closeModal=closeAddUserToChatModal ref='deleteUserFormRef'}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default withStore(withUser(Messenger));
