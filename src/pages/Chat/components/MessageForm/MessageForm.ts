import './MessageForm.scss';

import FormGroup from 'components/FormGroup';
import Component from 'core/Component';
import Form from 'utils/Form';
import { predefinedRules } from 'utils/FormValidator';
import withStore from 'utils/withStore';

import { sendMessage } from '../../../../services/messages';
import { MessageType } from '../Message/types';
import { ButtonStyle } from './../../../../components/Button/types';
import { MessageFormProps } from './types';

class MessageForm extends Component<MessageFormProps> {
  static componentName = 'MessageForm';
  public form: Form = new Form({ message: predefinedRules.message });

  constructor(props: MessageFormProps) {
    super({
      ...props,
      onMessageBlur: () => this.form.validate('message'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
    const { messageInput: message } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ message });
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();
    const chatId = this.props.store.getState().idParam;

    if (!this.form.hasErrors && chatId) {
      this.props.store.dispatch(sendMessage, {
        chatId,
        message: this.form.getValues().message,
        messageType: MessageType.TEXT,
      });
    }
  }

  render() {
    //template=hbs
    return `
      <form class='message-form'>
        <div class='message-form__attachments-button'>
            {{#Button type='button' style='icon'}}
                <i class='icon message-form__attachments-button-icon'></i>
            {{/Button}}
        </div>
        <div class='message-form__input-container'>
            {{{FormGroup class='message-form__input' name='message'
                placeholder='Сообщение...'
                onBlur=onMessageBlur ref='messageInput'
            }}}
        </div>
        <div class='message-form__send-button'>
            {{#Button style='${ButtonStyle.ICON}' className='btn_primary'}}
              <i class="icon message-form__send-button-icon"></i>
            {{/Button}}
        </div>
      </form>
    `;
  }
}

export default withStore(MessageForm);
