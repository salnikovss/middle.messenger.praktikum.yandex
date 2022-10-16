export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
  RESET = 'reset',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  ICON = 'icon',
  UNSTYLED = 'unstyled',
}

export type ButtonProps = {
  type?: ButtonType;
  style?: ButtonStyle;
  className?: string;
  onClick?: EventListener;
};

export type ButtonPropsWithEvents = Omit<ButtonProps, 'onClick'> & {
  events: {
    click?: EventListener;
  };
};
