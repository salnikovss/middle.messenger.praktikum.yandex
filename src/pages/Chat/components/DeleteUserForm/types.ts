import { Store } from 'core';

export type ChatUserProp = UserModel & {
  onClick: () => (userId: number) => void;
};

export type DeleteUserFormProps = {
  closeModal?: () => void;
  store: Store<AppState>;
  chatUsers?: Nullable<() => ChatUserProp[] | undefined>;
};
