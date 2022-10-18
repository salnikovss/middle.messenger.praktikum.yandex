import Modal from './Modal';

export type ModalProps = {
  title?: string;
  onShow?: (modal: Modal) => void;
  onClose?: (modal: Modal) => void;
};

export type ModalPropsWithEvents = ModalProps & {
  events: {
    click: (e: MouseEvent) => void;
  };
};
