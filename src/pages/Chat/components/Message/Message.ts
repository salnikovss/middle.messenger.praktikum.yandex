import './Message.scss';

import Handlebars from 'handlebars';

import template from './Message.hbs';

export const Message = () => {
  Handlebars.registerPartial('message', template);
};
