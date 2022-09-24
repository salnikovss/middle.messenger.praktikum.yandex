import './link.scss';

import Component from 'core/Component';

interface LinkProps {
  text: string;
  class?: string;
  to: string;
}

export class Link extends Component {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // const router = new Router();
      // router.go(this.props.to);
      // eslint-disable-next-line no-console
      console.log('clicked', e);
      // e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // langu,age=hbs
    return `<a class="{{class}}" href="{{to}}">{{{text}}}</a>`;
  }
}
