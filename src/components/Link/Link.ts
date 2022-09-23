import './link.scss';

import Component from '../../core/Component';

interface LinkProps {
  text: string;
  class?: string;
  to: string;
}

export class Link extends Component {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // const router = new Router();
      // router.go(this.props.to);
      console.log('clicked');
      // e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{to}}">{{text}}</a>`;
  }
}
