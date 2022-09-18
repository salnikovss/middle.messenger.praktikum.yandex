import './ErrorPage.scss';

import template from './ErrorPage.hbs';

const errorCodesText: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

export const ErrorPage = (code: number) => {
  const text = errorCodesText[code] ?? '';
  return template({ code, text });
};
