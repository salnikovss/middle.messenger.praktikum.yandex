import MessageForm from '../MessageForm';

export type MessengerProps = {
  chat: ChatModel;
  messages?: MessageModel[];
  messageForm?: MessageForm;
};
