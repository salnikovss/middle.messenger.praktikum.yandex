import { Store } from 'core';

export type SignUpProps = {
  onEmailBlur: (e: FocusEvent) => void;
  onLoginBlur: (e: FocusEvent) => void;
  onFirstNameBlur: (e: FocusEvent) => void;
  onSecondNameBlur: (e: FocusEvent) => void;
  onPasswordBlur: (e: FocusEvent) => void;
  onPhoneBlur: (e: FocusEvent) => void;
  store: Store<AppState>;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
