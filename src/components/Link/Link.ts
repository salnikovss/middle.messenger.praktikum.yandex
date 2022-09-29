import './link.scss';

import Component from 'core/Component';

import { LinkProps, LinkPropsWithEvents } from './types';

export class Link extends Component<LinkPropsWithEvents> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          location.href = this.props.to;
          e.preventDefault();
        },
      },
    });
  }

  render() {
    //template=hbs
    return `<a class="{{class}}" href="{{to}}">{{{text}}}</a>`;
  }
}
