import { Store } from 'core';

export type ProfileEditProps = {
  store: Store<AppState>;
  user: Nullable<UserModel>;
  onEmailBlur: (e: FocusEvent) => void;
  onLoginBlur: (e: FocusEvent) => void;
  onFirstNameBlur: (e: FocusEvent) => void;
  onSecondNameBlur: (e: FocusEvent) => void;
  onDisplayNameBlur: (e: FocusEvent) => void;
  onPhoneBlur: (e: FocusEvent) => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
