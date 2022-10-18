import { Store } from 'core';

import MessageForm from '../MessageForm';

export type MessengerProps = {
  store: Store<AppState>;
  chat?: () => Nullable<ChatModel> | undefined;
  messages?: MessageModel[];
  messageForm?: MessageForm;
  onDeleteChatClick: (e: MouseEvent) => void;
  onDeleteChatConfirm: () => void;
};
