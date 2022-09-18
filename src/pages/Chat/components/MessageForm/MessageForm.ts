import './MessageForm.scss';

import Handlebars from 'handlebars';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import template from './MessageForm.hbs';

export const MessageForm = () => {
  Button();
  Input();
  Handlebars.registerPartial('message-form', template);
};
