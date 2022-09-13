import Handlebars from 'handlebars';
import template from './Avatar.hbs';
import './Avatar.scss';

export const Avatar = () => {
  Handlebars.registerPartial('avatar', template);
};
