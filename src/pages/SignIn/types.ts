export type SignInProps = {
  onLoginBlur: (e: FocusEvent) => void;
  onPasswordBlur: (e: FocusEvent) => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
