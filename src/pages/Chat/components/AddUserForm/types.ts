import { Store } from 'core';

export type FoundUsersProp = UserModel & {
  onClick: () => (userId: number) => void;
};

export type AddUserFormProps = {
  closeModal?: () => void;
  store: Store<AppState>;
  onLoginBlur: (e: FocusEvent) => void;
  formError: () => void;
  foundUsers?: Nullable<() => FoundUsersProp[] | undefined>;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
