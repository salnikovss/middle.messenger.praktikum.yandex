import { ModalProps } from 'components/Modal';
import { Store } from 'core';

export type ConfirmationModalProps = ModalProps & {
  store: Store<AppState>;
  buttonYesText: string;
  buttonNoText?: string;

  formError: () => string | null;
  onConfirm?: (e: MouseEvent) => void;
  onCancel?: (e: MouseEvent) => void;
};
