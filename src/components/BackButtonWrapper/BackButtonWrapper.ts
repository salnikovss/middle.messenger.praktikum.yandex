import './BackButtonWrapper.scss';

import { Component } from 'core';

import { IBackButtonWrapperProps } from './types';

export class BackButtonWrapper extends Component<IBackButtonWrapperProps> {
  static componentName = 'BackButtonWrapper';
  render() {
    //template=hbs
    return `
      <div class='back-button-wrapper'>
        <a class='back-button-wrapper__link' href='{{#if route}}{{route}}{{else}}/{{/if}}'>
          <span class='back-button-wrapper__link-inner'></span>
        </a>
        <div class='back-button-wrapper__content custom-scrollbar'>
          <div class='back-button-wrapper__content-inner' data-layout=1>
          </div>
        </div>
      </div>
    `;
  }
}
