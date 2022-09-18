import './BackButtonWrapper.scss';

import Handlebars from 'handlebars';

import template from './BackButtonWrapper.hbs';

export function BackButtonWrapper() {
  Handlebars.registerPartial('backButtonWrapper', template);
}
