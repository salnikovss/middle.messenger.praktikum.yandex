import { Store } from 'core';

export type FoundUsersProp = UserModel & {
  onClick: () => (userId: number) => void;
};

export type AddUserFormProps = {
  closeModal?: () => void;
  store: Store<AppState>;
  foundUsers?: UserModel[];
  onLoginBlur: (e: FocusEvent) => void;
  formError: () => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
