import Handlebars from 'handlebars';
import template from './Button.hbs';
import './Button.scss';

export function Button() {
  Handlebars.registerPartial('button', template);
}
