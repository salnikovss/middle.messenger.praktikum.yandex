import Handlebars from 'handlebars';
import template from './Input.hbs';
import './Input.scss';

export function Input() {
  Handlebars.registerPartial('input', template);
}
