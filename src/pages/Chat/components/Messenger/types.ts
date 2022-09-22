import { IComponentProps } from '../../../../utils/Component';
import { ChatModel } from '../../types';
import Message from '../Message';
import { MessageForm } from '../MessageForm/MessageForm';

export interface IMessengerProps extends IComponentProps {
  chat: ChatModel;
  messages?: Message[];
  messageForm?: MessageForm;
}
