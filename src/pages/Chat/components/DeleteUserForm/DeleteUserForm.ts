import './DeleteUserForm.scss';

import { ButtonType } from 'components/Button/types';
import Component from 'core/Component';
import { addUsersToChat } from 'services/chat';
import Form from 'utils/Form';
import withStore from 'utils/withStore';

import { ButtonStyle } from '../../../../components/Button/types';
import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';
import { DeleteUserFormProps, FoundUsersProp } from './types';

class DeleteUserForm extends Component<DeleteUserFormProps> {
  static componentName = 'DeleteUserForm';
  public form: Form = new Form({
    login: predefinedRules.search_login,
  });

  constructor(props: DeleteUserFormProps) {
    super({ ...props });
    this.setProps({
      formError: () => this.props.store?.getState().formError,
      foundUsers: () =>
        this.props.store?.getState().foundUsers?.map((user) => {
          return { ...user, onClick: () => this.onDeleteClick(user.id) } as FoundUsersProp;
        }),
    });
  }

  onDeleteClick = (userId: number) => {
    const chatId = this.props.store.getState().idParam;
    if (chatId) {
      this.props.store.dispatch(addUsersToChat, { users: [userId], chatId }, () => {
        this.props.closeModal && this.props.closeModal();
      });
    }
  };

  // componentDidUpdate(oldProps: CreateChatFormProps, newProps: CreateChatFormProps): boolean {
  //   return oldProps.formError !== newProps.formError;
  // }

  render() {
    //template=hbs
    return `
      <div class='add-user-form'>
        {{#if foundUsers}}
          <ul class='found-users-list'>
          {{#each foundUsers}}
            <li class='found-users-list__item'>
              {{#Button
                type='${ButtonType.BUTTON}'
                style='${ButtonStyle.UNSTYLED}'
                onClick=this.onClick
                className='found-users-list__item-button'
              }}
                <span class='found-users-list__item-login'>{{this.login}}</span>
                <span class='found-users-list__item-icon'>+</span>
              {{/Button}}
            </li>
          {{/each}}
          </ul>
        {{/if}}
    </div>
    `;
  }
}

export default withStore(DeleteUserForm);
