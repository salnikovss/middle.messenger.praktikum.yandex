import './CenteredBox.scss';

import Component from 'core/Component';

export class CenteredBox extends Component {
  static componentName = 'CenteredBox';

  render() {
    //template=hbs
    return `
      <div class='centered-box'>
          <div class='centered-box__inner'>
              {{#if title}}
                  <h1 class='centered-box__title'>{{title}}</h1>
              {{/if}}
              <div class='centered-box__content' data-layout=1></div>
          </div>
      </div>
    `;
  }
}
