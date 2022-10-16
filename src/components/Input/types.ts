export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  TEL = 'tel',
  NUMBER = 'number',
  EMAIL = 'email',
  FILE = 'file',
}

export type InputProps = {
  name: string;
  type?: InputType;
  class?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  onInput?: (e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
};

export type InputPropsWithEvents = Omit<InputProps, 'onBlur' | 'onInput' | 'onFocus'> & {
  events: {
    input?: (e: Event) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
  };
};
