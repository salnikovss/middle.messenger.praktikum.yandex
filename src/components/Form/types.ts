export interface IFormProps {
  onSubmit?: EventListener;
}

export interface IFormPropsWithEvents extends Omit<IFormProps, 'onSubmit'> {
  events: {
    submit?: EventListener;
  };
}
