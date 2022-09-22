import './Avatar.scss';

import Component from '../../../../utils/Component';
import template from './Avatar.hbs';

export class Avatar extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
