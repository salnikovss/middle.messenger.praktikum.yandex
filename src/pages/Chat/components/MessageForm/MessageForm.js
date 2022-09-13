import Handlebars from 'handlebars';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import template from './MessageForm.hbs';
import './MessageForm.scss';

export const MessageForm = () => {
  Button();
  Input();
  Handlebars.registerPartial('message-form', template);
};
