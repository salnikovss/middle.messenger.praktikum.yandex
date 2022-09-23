import './ErrorPage.scss';

import Component from '../../core/Component';
import { routeConsts } from './../../../config/routes';
import { IErrorPageProps } from './types';

const errorCodesText: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

export default class ErrorPage extends Component<IErrorPageProps> {
  constructor(props: IErrorPageProps) {
    super({
      ...props,
      text: errorCodesText[props.code] ?? '',
    });
  }

  render() {
    return `
      <div class='error-box'>
        <div class='error-box__inner'>{{test}}
          <p class='error-box__code'>{{code}}</p>
          <p class='error-box__text'>{{text}}</p>
          {{{Link text='Перейти на главную' class='error-box__link' to='${routeConsts.HOME}'}}}
        </div>
      </div>
    `;
  }
}
