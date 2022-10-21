import { ButtonType } from 'components/Button/types';
import Component from 'core/Component';
import { deleteUsersFromChat } from 'services/chat';
import withStore from 'utils/withStore';

import { ButtonStyle } from '../../../../components/Button/types';
import isEqual from '../../../../utils/isEqual';
import { DeleteUserFormProps } from './types';

class DeleteUserForm extends Component<DeleteUserFormProps> {
  static componentName = 'DeleteUserForm';

  onDeleteClick = (userId: number) => {
    const chatId = this.props.store.getState().idParam;
    if (chatId) {
      this.props.store.dispatch(deleteUsersFromChat, { users: [userId], chatId }, () => {
        this.props.closeModal && this.props.closeModal();
      });
    }
  };

  componentDidUpdate(oldProps: DeleteUserFormProps, newProps: DeleteUserFormProps): boolean {
    return !isEqual({ chatUsers: oldProps.chatUsers }, { chatUsers: newProps.chatUsers });
  }

  render() {
    const foundUsers = this.props.chatUsers;
    const showChatUsersResult = Array.isArray(foundUsers) ? foundUsers.length : false;

    //template=hbs
    return `
      <div class='delete-user-form'>
        {{#if chatUsers}}
          <div class='found-users-list found-users-list_max-height-250 custom-scrollbar'>
            <ul class='found-users-list__inner'>
            {{#each chatUsers}}
              <li class='found-users-list__item'>
                {{#Button
                  type='${ButtonType.BUTTON}'
                  style='${ButtonStyle.UNSTYLED}'
                  onClick=this.onClick
                  className='found-users-list__item-button'
                }}
                  <span class='found-users-list__item-avatar'>
                      <span class='found-users-list__item-avatar-image'
                          {{#if this.avatar}}style='background-image:url({{this.avatar}})'{{/if}}>
                      </span>
                  </span>
                  <span class='found-users-list__item-login'>{{this.login}}</span>
                  <i class='i i_trash'></i>
                {{/Button}}
              </li>
            {{/each}}
            </ul>
          </div>
        {{/if}}
        ${
          showChatUsersResult === 0
            ? `<p class='found-users-list__not-found'>Вы единственный пользователь в данном чате</p>`
            : ''
        }
    </div>
    `;
  }
}

export default withStore(DeleteUserForm);
