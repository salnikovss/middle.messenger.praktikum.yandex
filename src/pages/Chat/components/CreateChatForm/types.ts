import { Store } from 'core';

export type CreateChatFormProps = {
  store: Store<AppState>;
  onTitleBlur: (e: FocusEvent) => void;
  formError: () => void;
  closeModal?: () => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
