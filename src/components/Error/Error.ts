import './Error.scss';

import Component from 'core/Component';

import { ErrorProps } from './types';

export class Error extends Component<ErrorProps> {
  static componentName = 'Error';

  render() {
    //template=hbs
    return `<p class='error'>{{#if text}}{{text}}{{/if}}</p>`;
  }
}
