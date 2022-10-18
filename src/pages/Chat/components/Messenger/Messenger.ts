import './Messenger.scss';

import Modal from 'components/Modal';
import Component from 'core/Component';
import registerComponent from 'core/registerComponent';
import { deleteChat, deleteUsersFromChat } from 'services/chat';
import { transformUser } from 'utils/apiTransformers';
import isEqual from 'utils/isEqual';
import withStore from 'utils/withStore';

import { chatAPI } from '../../../../api/chat';
import { UserDTO } from '../../../../api/types';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { fakeMessages } from '../../../../utils/fakeData';
import AddUserForm from '../AddUserForm';
import DeleteUserForm from '../DeleteUserForm';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ButtonStyle, ButtonType } from './../../../../components/Button/types';
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
        (this.refs.deleteUserFromChatModalRef as unknown as Modal).open();
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
      onDeleteUserModalShow: async (modal) => {
        const chatId = this.props.store.getState().idParam;

        if (chatId) {
          const { response } = await chatAPI.getUsers({ chatId });
          if (response) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (this.refs.deleteUserFormRef as unknown as DeleteUserForm).setProps({
              chatUsers: (response as UserDTO[])
                .filter((user) => user.role !== 'admin')
                .map((user) => transformUser(user))
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
      if (prevState.idParam !== nextState.idParam) {
        this.scrollToBottom();
      }
    });
  }

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    return !isEqual({ idParam: oldProps.chat }, { idParam: newProps.chat });
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

        {{#Modal title='Удалить пользователя из чата' ref='deleteUserFromChatModalRef' onShow=onDeleteUserModalShow}}
          {{{DeleteUserForm closeModal=closeAddUserToChatModal ref='deleteUserFormRef'}}}
        {{/Modal}}
      </div>
    `;
  }
}

export default withStore(Messenger);
