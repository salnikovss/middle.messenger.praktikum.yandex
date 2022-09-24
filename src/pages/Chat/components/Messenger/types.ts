import { IComponentProps } from 'core/Component';

import { ChatModel } from '../../types';
import { MessageModel } from '../Message';
import { MessageForm } from '../MessageForm/MessageForm';

export interface IMessengerProps extends IComponentProps {
  chat: ChatModel;
  messages?: MessageModel[];
  messageForm?: MessageForm;
}
