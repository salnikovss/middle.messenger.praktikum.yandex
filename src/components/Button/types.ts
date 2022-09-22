import { IComponentProps } from '../../utils/Component';
export enum ButtonType {
  SUBMIT = 'SUBMIT',
  BUTTON = 'BUTTON',
  RESET = 'RESET',
}

export enum ButtonStyle {
  PRIMARY = 'primary',
  ICON = 'icon',
}

export interface IButtonProps extends IComponentProps {
  type?: ButtonType;
  body: string;
  style?: ButtonStyle;
  classes?: string;
}
