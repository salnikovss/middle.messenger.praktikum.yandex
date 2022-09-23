export enum ButtonType {
  SUBMIT = 'SUBMIT',
  BUTTON = 'BUTTON',
  RESET = 'RESET',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  ICON = 'icon',
}

export interface IButtonProps {
  type?: ButtonType;
  body: string;
  style?: ButtonStyle;
  classes?: string;
  onClick?: EventListener;
}

export interface IButtonPropsWithEvents extends Omit<IButtonProps, 'onClick'> {
  events: {
    click?: EventListener;
  };
}
