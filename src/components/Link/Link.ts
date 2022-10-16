import './Link.scss';

import Component from 'core/Component';

import { LinkProps, LinkPropsWithEvents } from './types';

export default class Link extends Component<LinkPropsWithEvents> {
  static componentName = 'Link';

  constructor({ onClick, ...rest }: LinkProps) {
    super({
      ...rest,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          if (typeof onClick === 'function') {
            onClick(e);
          } else {
            window.router.go(this.props.to);
          }
          return false;
        },
      },
    });
  }

  render() {
    //template=hbs
    return `<a class="{{class}}" href="{{#if to}}{{to}}{{else}}#{{/if}}">{{{text}}}</a>`;
  }
}
