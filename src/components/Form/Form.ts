import Component from '../../core/Component';
import { IFormProps, IFormPropsWithEvents } from './types';

export class Form extends Component<IFormPropsWithEvents> {
  constructor({ onSubmit, ...rest }: IFormProps) {
    super();
    this.setProps({
      ...rest,
      events: {
        submit: onSubmit,
      },
    });
  }
  render() {
    return `
      <form method="post" data-layout="form">fo</form>
    `;
  }
}
