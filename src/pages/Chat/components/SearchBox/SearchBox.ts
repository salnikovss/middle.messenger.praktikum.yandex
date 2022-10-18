import Component from 'core/Component';

import { SearchBoxProps } from './types';

export default class SearchBox extends Component<SearchBoxProps> {
  static componentName = 'SearchBox';

  constructor({ onSearch }: SearchBoxProps) {
    super({
      onSearch,
      onInput: (e) => {
        if (typeof onSearch === 'function') {
          onSearch((e.target as HTMLInputElement).value);
        }
      },
    });
  }

  render() {
    //template=hbs
    return `
      <div class='search-box'>
          {{{FormGroup name='search' placeholder='Поиск' style='lighter' onInput=onInput }}}
      </div>
    `;
  }
}
