import './MessageForm.scss';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Component from '../../../../utils/Component';
import template from './MessageForm.hbs';

export class MessageForm extends Component {
  render(): DocumentFragment {
    Button();
    Input();
    return this.compile(template, {});
  }
}
