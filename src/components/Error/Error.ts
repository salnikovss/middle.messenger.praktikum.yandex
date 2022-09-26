import './Error.scss';

import Component from 'core/Component';

import { IErrorProps } from './types';

export class Error extends Component<IErrorProps> {
  static componentName = 'Error';

  render() {
    //template=hbs
    return `<p class='error'>{{#if text}}{{text}}{{/if}}</p>`;
  }
}
