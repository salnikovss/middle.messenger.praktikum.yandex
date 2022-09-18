import './Button.scss';

import Handlebars from 'handlebars';

import template from './Button.hbs';


export function Button() {
  Handlebars.registerPartial('button', template);
}
