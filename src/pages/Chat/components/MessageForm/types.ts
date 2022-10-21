import { Store } from 'core';

export type MessageFormProps = {
  store: Store<AppState>;
  onMessageBlur: () => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
