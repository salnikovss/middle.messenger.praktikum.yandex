import Modal from 'components/Modal';
import { Store } from 'core';

import MessageForm from '../MessageForm';

export type MessengerProps = {
  store: Store<AppState>;
  chat?: () => Nullable<ChatModel> | undefined;
  messages?: MessageModel[];
  messageForm?: MessageForm;
  onDeleteChatConfirm: () => void;
  onDeleteChatClick: (e: MouseEvent) => void;
  onAddUserClick: (e: MouseEvent) => void;
  closeAddUserToChatModal: () => void;
  onDeleteUserClick: (e: MouseEvent) => void;
  onDeleteUserModalShow: (modal: Modal) => void;
};
