import './Modal.scss';

import Handlebars from 'handlebars';

import template from './Modal.hbs';

export function Modal() {
  Handlebars.registerPartial('modal', template);
}
