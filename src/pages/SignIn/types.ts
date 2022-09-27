export interface ISignInProps {
  onLoginBlur: (e: FocusEvent) => void;
  onPasswordBlur: (e: FocusEvent) => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
}
