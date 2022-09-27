export interface IPasswordChangeProps {
  user: UserModel;
  onOldPasswordBlur: (e: FocusEvent) => void;
  onNewPasswordBlur: (e: FocusEvent) => void;
  onNewPassword2Blur: (e: FocusEvent) => void;
  events: {
    submit: (e: SubmitEvent) => void;
  };
}
