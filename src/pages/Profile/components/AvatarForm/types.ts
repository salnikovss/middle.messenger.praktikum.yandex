import { Store } from 'core';

export type AvatarFormProps = {
  onFileInputChange: (e: FocusEvent) => void;
  formError: () => Nullable<string>;
  store: Store<AppState>;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
