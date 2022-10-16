export type FileInputProps = {
  name: string;
  class?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  onChange?: (e: Event) => void;
};

export type FileInputPropsWithEvents = Omit<FileInputProps, 'onChange'> & {
  events: {
    change?: (e: Event) => void;
  };
};
