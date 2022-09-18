import './Input.scss';

import Handlebars from 'handlebars';

import template from './Input.hbs';

export function Input() {
  Handlebars.registerPartial('input', template);
}
