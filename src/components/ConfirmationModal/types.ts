import { ModalProps } from 'components/Modal';

export type ConfirmationModalProps = ModalProps & {
  buttonYesText: string;
  buttonNoText?: string;

  onConfirm?: (e: MouseEvent) => void;
  onCancel?: (e: MouseEvent) => void;
};
