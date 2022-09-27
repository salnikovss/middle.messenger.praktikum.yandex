import { IErrorProps } from 'components/Error';
import { Input } from 'components/Input/Input';
import { IInputProps } from 'components/Input/types';

export interface IProfileFormRowProps extends IInputProps, IErrorProps {
  label?: string;
  inputRef?: Input;
  errorRef?: Error;
}
