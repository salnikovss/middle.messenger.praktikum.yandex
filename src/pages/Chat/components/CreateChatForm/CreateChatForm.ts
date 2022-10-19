import './CreateChatForm.scss';

import FormGroup from 'components/FormGroup';
import Component from 'core/Component';
import { createChat } from 'services/chat';
import Form from 'utils/Form';
import withStore from 'utils/withStore';

import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';
import { CreateChatFormProps } from './types';

class CreateChatForm extends Component<CreateChatFormProps> {
  static componentName = 'CreateChatForm';
  public form: Form = new Form({
    title: predefinedRules.chet_title,
  });

  constructor(props: CreateChatFormProps) {
    super({
      ...props,
      onTitleBlur: () => this.form.validate('title'),
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

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
    const { titleInput: title } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ title });
  }

  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();

    if (!this.form.hasErrors) {
      const formValues = this.form.getValues();
      this.props.store.dispatch(createChat, { title: formValues.title }, () => {
        console.log('success', this.props.closeModal);

        this.props.closeModal && this.props.closeModal();
      });
    }
  }

  componentDidUpdate(oldProps: CreateChatFormProps, newProps: CreateChatFormProps): boolean {
    return oldProps.formError !== newProps.formError;
  }

  render() {
    //template=hbs
    return `
      <div class='create-chat-form'>
        <form>
            {{{Error className='error_form' text=formError}}}

            {{{FormGroup label='Название чата' name='login'
                style='lighter' ref='titleInput' onBlur=onTitleBlur}}}

            {{#Button}}Создать{{/Button}}
        </form>
      </div>
    `;
  }
}

export default withStore(CreateChatForm);
