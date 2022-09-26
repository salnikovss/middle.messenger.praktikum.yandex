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
  ref?: HTMLElement;
  class?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  onInput?: (e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
}

export interface IInputPropsWithEvents extends Omit<IInputProps, 'onBlur' | 'onInput' | 'onFocus'> {
  events: {
    input?: (e: Event) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
  };
}
