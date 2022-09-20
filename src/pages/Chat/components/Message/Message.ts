import './Message.scss';

import Component from '../../../../utils/Component';
import template from './Message.hbs';

export class Message extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
