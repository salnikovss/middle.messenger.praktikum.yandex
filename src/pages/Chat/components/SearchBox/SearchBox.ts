import Component from 'core/Component';

export class SearchBox extends Component {
  static componentName = 'SearchBox';
  constructor() {
    super();
  }

  render() {
    //template=hbs
    return `
      <div class='search-box'>
          {{{FormGroup name='search' placeholder='Поиск' style='lighter' }}}
      </div>
    `;
  }
}
