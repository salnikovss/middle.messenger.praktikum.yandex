import template from './error.hbs';
import './error.scss';

const errorText = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так',
};

export const pageError = (code) => {
  let text = errorText[code] ?? '';
  return template({ code, text });
};
