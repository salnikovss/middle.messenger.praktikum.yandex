import Handlebars from 'handlebars';
import template from './CenteredBox.hbs';
import './CenteredBox.scss';

export function CenteredBox() {
  Handlebars.registerPartial('centeredBox', template);
}
