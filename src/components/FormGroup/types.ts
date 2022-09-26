import { IErrorProps } from '../Error/types';
import { IInputProps } from '../Input';

export interface IFormGroupProps extends IInputProps, IErrorProps {
  label?: string;
  error?: string;
  ref?: HTMLElement;
  errorRef?: HTMLElement;
}
