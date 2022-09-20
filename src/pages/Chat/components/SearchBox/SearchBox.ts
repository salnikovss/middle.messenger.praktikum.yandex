import Input from '../../../../components/Input';
import Component from '../../../../utils/Component';
import template from './SearchBox.hbs';

export class SearchBox extends Component {
  render(): DocumentFragment {
    Input();
    const data = {};
    return this.compile(template, data);
  }
}
