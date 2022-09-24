export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  TEL = 'tel',
  NUMBER = 'number',
  EMAIL = 'email',
}

export interface IInputProps {
  name: string;
  type?: InputType;
  class?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  onBlur: EventListener;
  onFocus: EventListener;
}

export interface IInputPropsWithEvents extends Omit<IInputProps, 'onBlur' | 'onFocus'> {
  events: {
    blur?: EventListener;
    focus?: EventListener;
  };
}
