import './link.scss';

import Component from 'core/Component';

import { LinkProps, LinkPropsWithEvents } from './types';

export default class Link extends Component<LinkPropsWithEvents> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          window.router.go(this.props.to);
          return false;
        },
      },
    });
  }

  render() {
    //template=hbs
    return `<a class="{{class}}" href="{{to}}">{{{text}}}</a>`;
  }
}
