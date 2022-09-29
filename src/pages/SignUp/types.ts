export type SignUpProps = {
  onEmailBlur: (e: FocusEvent) => void;
  onLoginBlur: (e: FocusEvent) => void;
  onFirstNameBlur: (e: FocusEvent) => void;
  onSecondNameBlur: (e: FocusEvent) => void;
  onPasswordBlur: (e: FocusEvent) => void;
  onPhoneBlur: (e: FocusEvent) => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
};
