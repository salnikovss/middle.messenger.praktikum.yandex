import './Error.scss';

import Component from 'core/Component';

import { ErrorProps } from './types';

export default class Error extends Component<ErrorProps> {
  static componentName = 'Error';

  constructor({ text, ...rest }: ErrorProps) {
    super({
      ...rest,
      text: text || '',
    });
  }

  render() {
    //template=hbs
    return `
      <p class='error {{className}}'>
        <span class='error__inner'>{{#if text}}{{text}}{{/if}}</span>
      </p>
    `;
  }
}
