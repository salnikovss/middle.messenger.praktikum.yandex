import './BackButtonWrapper.scss';

import { Component } from 'core';

import { IBackButtonWrapperProps } from './types';

export class BackButtonWrapper extends Component<IBackButtonWrapperProps> {
  static componentName = 'BackButtonWrapper';
  render() {
    //template=hbs
    return `
      <div class='back-button-wrapper'>
        {{{Link 
          text="<span class='back-button-wrapper__link-inner'></span>"
          to='${this.props.route ?? '/'}'
          class='back-button-wrapper__link' 
        }}}
        <div class='back-button-wrapper__content custom-scrollbar'>
          <div class='back-button-wrapper__content-inner' data-layout=1>
          </div>
        </div>
      </div>
    `;
  }
}
