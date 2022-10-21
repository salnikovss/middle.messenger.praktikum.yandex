import './CenteredBox.scss';

import Component from 'core/Component';

import { CenteredBoxProps } from './types';

export default class CenteredBox extends Component<CenteredBoxProps> {
  static componentName = 'CenteredBox';

  render() {
    //template=hbs
    return `
      <div class='centered-box'>
          <div class='centered-box__inner'>
              {{#if title}}
                  <h1 class='centered-box__title'>{{title}}</h1>
              {{/if}}
              <div class='centered-box__content'>
                <template data-slot=1></template>
              </div>
          </div>
      </div>
    `;
  }
}
