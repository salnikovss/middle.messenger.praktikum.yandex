import { MessageForm } from '../MessageForm/MessageForm';

export type MessengerProps = {
  chat: ChatModel;
  messages?: MessageModel[];
  messageForm?: MessageForm;
};
