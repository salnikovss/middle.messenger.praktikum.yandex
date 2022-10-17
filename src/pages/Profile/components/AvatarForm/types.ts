import { Store } from 'core';

export type AvatarFormProps = {
  onFileInputChange: (e: FocusEvent) => void;
  store: Store<AppState>;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
