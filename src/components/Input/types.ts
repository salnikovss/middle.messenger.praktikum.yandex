import { IComponentProps } from '../../utils/Component';

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  TEL = 'tel',
  NUMBER = 'number',
  EMAIL = 'email',
}

export interface IInputProps extends IComponentProps {
  name: string;
  type?: InputType;
  class?: string;
  style?: string;
  placeholder?: string;
}
