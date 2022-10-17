import { Store } from 'core';

export type PasswordChangeProps = {
  store: Store<AppState>;
  user: Nullable<UserModel>;
  onOldPasswordBlur: (e: FocusEvent) => void;
  onNewPasswordBlur: (e: FocusEvent) => void;
  onNewPassword2Blur: (e: FocusEvent) => void;
  formError: () => Nullable<string>;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
