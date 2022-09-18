import './Avatar.scss';

import Handlebars from 'handlebars';

import template from './Avatar.hbs';

export const Avatar = () => {
  Handlebars.registerPartial('avatar', template);
};
