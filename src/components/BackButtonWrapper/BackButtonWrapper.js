import Handlebars from 'handlebars';
import template from './BackButtonWrapper.hbs';
import './BackButtonWrapper.scss';

export function BackButtonWrapper() {
  Handlebars.registerPartial('backButtonWrapper', template);
}
