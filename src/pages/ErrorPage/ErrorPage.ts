import './ErrorPage.scss';

import { ROUTE_PATHS } from 'config/routes';
import Component from 'core/Component';

import { ErrorPageProps } from './types';

const errorCodesText: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

export default class ErrorPage extends Component<ErrorPageProps> {
  static componentName = 'ErrorPage';

  constructor(props: ErrorPageProps) {
    props.code = props.code ?? 404;

    super({
      ...props,
      text: errorCodesText[props.code] ?? '',
    });
  }

  render() {
    //template=hbs
    return `
      <div class='error-box'>
        <div class='error-box__inner'>{{test}}
          <p class='error-box__code'>{{code}}</p>
          <p class='error-box__text'>{{text}}</p>
          {{{Link text='Перейти на главную' class='error-box__link' to='${ROUTE_PATHS.HOME}'}}}
        </div>
      </div>
    `;
  }
}

export class ErrorPage404 extends ErrorPage {
  constructor(props: ErrorPageProps) {
    super({ ...props, code: 404 });
  }
}

export class ErrorPage500 extends ErrorPage {
  constructor(props: ErrorPageProps) {
    super({ ...props, code: 500 });
  }
}
