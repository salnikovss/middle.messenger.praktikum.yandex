import template from './ErrorPage.hbs';
import './ErrorPage.scss';

const errorText = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

export const ErrorPage = (code) => {
  let text = errorText[code] ?? '';
  return template({ code, text });
};
