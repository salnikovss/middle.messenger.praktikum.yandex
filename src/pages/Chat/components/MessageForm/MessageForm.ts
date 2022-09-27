import './MessageForm.scss';

import Component from 'core/Component';
import Form from 'utils/Form';

import { FormGroup } from '../../../../components/FormGroup/FormGroup';
import { PredefinedRules } from '../../../../utils/FormValidator';
import { ButtonStyle } from './../../../../components/Button/types';

export class MessageForm extends Component {
  static componentName = 'MessageForm';
  public form: Form;

  constructor() {
    super();

    const { message } = PredefinedRules;
    this.form = new Form({ message });

    this.setProps({
      onMessageBlur: () => this.form.validate('message'),
      events: {
        submit: this.onSubmit.bind(this),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
    const { messageInput: message } = this.refs as Record<string, FormGroup>;
    this.form.setRefs({ message });
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line no-console
    console.log('Submitted data', this.form.getValues());

    const validationResult = this.form.validate();
    // eslint-disable-next-line no-console
    console.log('Validation result', validationResult);

    if (!this.form.hasErrors) {
      // eslint-disable-next-line no-console
      console.log('Validation passed. Submitting form....');
    }
  }

  render() {
    return `
      <form class='message-form'>
        <div class='message-form__attachments-button'>
            {{{Button body="<i class='icon message-form__attachments-button-icon'></i>" type='button' style='icon'}}}
        </div>  
        <div class='message-form__input-container'>
            {{{FormGroup class='message-form__input' name='message'
                placeholder='Сообщение...' textarea=true
                onBlur=onMessageBlur ref='messageInput'  
            }}}
        </div>
        <div class='message-form__send-button'>
            {{{Button body='<i class="icon message-form__send-button-icon"></i>'
              style='${ButtonStyle.ICON}' classes='btn_primary'}}}
        </div>
      </form>
    `;
  }
}
