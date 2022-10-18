import './DeleteUserForm.scss';

import { ButtonType } from 'components/Button/types';
import Component from 'core/Component';
import { deleteUsersFromChat } from 'services/chat';
import withStore from 'utils/withStore';

import { ButtonStyle } from '../../../../components/Button/types';
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

  // componentDidUpdate(oldProps: CreateChatFormProps, newProps: CreateChatFormProps): boolean {
  //   return oldProps.formError !== newProps.formError;
  // }

  render() {
    const foundUsers = this.props.chatUsers;

    const showChatUsersResult = Array.isArray(foundUsers) ? foundUsers.length : false;

    //template=hbs
    return `
      <div class='add-user-form'>
        {{#if chatUsers}}
          <ul class='found-users-list'>
          {{#each chatUsers}}
            <li class='found-users-list__item'>
              {{#Button
                type='${ButtonType.BUTTON}'
                style='${ButtonStyle.UNSTYLED}'
                onClick=this.onClick
                className='found-users-list__item-button'
              }}
                <span class='found-users-list__item-login'>{{this.login}}</span>
                <span class='found-users-list__item-icon'>-</span>
              {{/Button}}
            </li>
          {{/each}}
          </ul>
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
