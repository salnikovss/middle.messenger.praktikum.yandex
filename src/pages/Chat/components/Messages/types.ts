import { Store } from 'core';

export type MessagesProps = {
  className: string;
  store: Store<AppState>;
  messages: () => Nullable<MessageModel[]> | undefined;
};
