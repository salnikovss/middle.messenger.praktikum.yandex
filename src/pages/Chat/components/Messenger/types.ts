import Modal from 'components/Modal';
import { Store } from 'core';

export type MessengerProps = {
  store: Store<AppState>;
  user: UserModel;
  chatId: number;
  chat?: () => Nullable<ChatModel> | undefined;
  messages?: MessageModel[];
  // @ts-expect-error error because MessageForm wrapped by withStore
  messageForm?: MessageForm;
  onDeleteChatConfirm: () => void;
  onDeleteChatClick: (e: MouseEvent) => void;
  onAddUserClick: (e: MouseEvent) => void;
  closeAddUserToChatModal: () => void;
  onDeleteUserClick: (e: MouseEvent) => void;
  onDeleteUserModalShow: (modal: Modal) => void;
};
