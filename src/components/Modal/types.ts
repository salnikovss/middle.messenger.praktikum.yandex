export type ModalProps = {
  title?: string;
};

export type ModalPropsWithEvents = ModalProps & {
  events: {
    click: (e: MouseEvent) => void;
  };
};
