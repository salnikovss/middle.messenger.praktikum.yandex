import './ErrorPage.scss';

import Component from '../../utils/Component';
import template from './ErrorPage.hbs';

const errorCodesText: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

type ErrorPageProps = {
  code: number;
  text?: string;
};
export default class ErrorPage extends Component {
  constructor(props: ErrorPageProps) {
    props['text'] = errorCodesText[props.code] ?? '';

    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
