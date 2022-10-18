import './AddUserForm.scss';

import { ButtonType } from 'components/Button/types';
import FormGroup from 'components/FormGroup';
import Component from 'core/Component';
import { addUsersToChat } from 'services/chat';
import Form from 'utils/Form';
import log from 'utils/log';
import withStore from 'utils/withStore';

import { userAPI } from '../../../../api/user';
import apiHasError from '../../../../utils/apiHasError';
import { transformUser } from '../../../../utils/apiTransformers';
import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';
import { ButtonStyle } from './../../../../components/Button/types';
import { AddUserFormProps } from './types';

class AddUserForm extends Component<AddUserFormProps> {
  static componentName = 'AddUserForm';
  public form: Form = new Form({
    login: predefinedRules.search_login,
  });

  constructor(props: AddUserFormProps) {
    super({
      ...props,
      onLoginBlur: () => this.form.validate('login'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.FLOW_CDM, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.FLOW_CDU, this.updateFormRefs.bind(this));
  }

  onAddClick = (userId: number) => {
    const chatId = this.props.store.getState().idParam;
    if (chatId) {
      this.props.store.dispatch(addUsersToChat, { users: [userId], chatId }, () => {
        this.props.closeModal && this.props.closeModal();
        this.props.store.dispatch({ foundUsers: null });
      });
    }
  };

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
    const { loginInput: login } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ login });
  }

  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();

    if (!this.form.hasErrors) {
      const formValues = this.form.getValues();

      // this.props.store.dispatch(searchUserByLogin, { login: formValues.login });
      const { response } = await userAPI.search({ login: formValues.login });
      if (apiHasError(response)) {
        log('Search user error', response);
        this.props.store.dispatch({ isLoading: false, formError: response.reason });
      } else {
        const foundUsers = response
          .map((user) => transformUser(user))
          .map((user) => {
            return {
              ...user,
              onClick: () => this.onAddClick(user.id),
            };
          });

        this.setProps({ foundUsers });
      }
    }
  }

  render() {
    const foundUsers = this.props.foundUsers;
    const showUsersSearchResult = Array.isArray(foundUsers) ? foundUsers.length : false;

    //template=hbs
    return `
      <div class='add-user-form'>
        <form>
            {{{Error className='error_form' text=formError}}}

            {{{FormGroup label='Имя пользователя' name='login'
                style='lighter' ref='loginInput' onBlur=onLoginBlur}}}

            {{#Button}}Найти{{/Button}}
        </form>
        </form>

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
        ${
          showUsersSearchResult === 0
            ? `<p class='found-users-list__not-found'>Пользователи с таким логином не найдены</p>`
            : ''
        }
    </div>
    `;
  }
}

export default withStore(AddUserForm);
