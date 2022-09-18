import './ErrorPage.scss';

import Component, { IComponentProps } from '../../utils/Component';
import template from './ErrorPage.hbs';

const errorCodesText: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

// export const ErrorPage = (code: number) => {
//   const text = errorCodesText[code] ?? '';
//   return template({ code, text });
// };

interface ErrorPageProps extends IComponentProps {
  code: number;
}
export default class ErrorPage extends Component<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    // Создаём враппер DOM-элемент button
    super('button', props);
  }

  render() {
    const data = {
      code: this.props.code,
      text: errorCodesText[this.props.code] ?? '',
    };

    return template(data);
  }
}
