import { Store } from 'core';

export type SignInProps = {
  onLoginBlur: (e: FocusEvent) => void;
  onPasswordBlur: (e: FocusEvent) => void;
  store: Store<AppState>;
  formError: () => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
