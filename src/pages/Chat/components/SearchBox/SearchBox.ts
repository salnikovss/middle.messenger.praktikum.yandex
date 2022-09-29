import Component from 'core/Component';

export default class SearchBox extends Component {
  static componentName = 'SearchBox';

  render() {
    //template=hbs
    return `
      <div class='search-box'>
          {{{FormGroup name='search' placeholder='Поиск' style='lighter' }}}
      </div>
    `;
  }
}
