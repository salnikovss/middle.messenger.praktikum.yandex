export enum ButtonType {
  SUBMIT = 'SUBMIT',
  BUTTON = 'BUTTON',
  RESET = 'RESET',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  ICON = 'icon',
}

export type ButtonProps = {
  type?: ButtonType;
  body: string;
  style?: ButtonStyle;
  classes?: string;
  onClick?: EventListener;
};

export type ButtonPropsWithEvents = Omit<ButtonProps, 'onClick'> & {
  events: {
    click?: EventListener;
  };
};
