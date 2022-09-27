export interface ITextareaProps {
  name: string;
  class?: string;
  value?: string;
  placeholder?: string;
  onInput?: (e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
}

export interface ITextareaPropsWithEvents extends Omit<ITextareaProps, 'onBlur' | 'onInput' | 'onFocus'> {
  events: {
    input?: (e: Event) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
  };
}
