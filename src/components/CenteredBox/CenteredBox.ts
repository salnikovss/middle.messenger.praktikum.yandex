import './CenteredBox.scss';

import Handlebars from 'handlebars';

import template from './CenteredBox.hbs';

export function CenteredBox() {
  Handlebars.registerPartial('centeredBox', template);
}
