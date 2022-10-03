export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
  RESET = 'reset',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  ICON = 'icon',
}

export type ButtonProps = {
  type?: ButtonType;
  style?: ButtonStyle;
  classes?: string;
  onClick?: EventListener;
};

export type ButtonPropsWithEvents = Omit<ButtonProps, 'onClick'> & {
  events: {
    click?: EventListener;
  };
};
