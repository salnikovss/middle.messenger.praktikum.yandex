import Handlebars from 'handlebars';
import template from './Message.hbs';
import './Message.scss';

export const Message = () => {
  Handlebars.registerPartial('message', template);
};
