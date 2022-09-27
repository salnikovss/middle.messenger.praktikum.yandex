import Error from 'components/Error';
import Input, { IInputProps } from 'components/Input';

import { IErrorProps } from '../Error/types';

export interface IFormGroupProps extends IInputProps, IErrorProps {
  label?: string;
  inputRef?: Input;
  errorRef?: Error;
  textarea?: boolean;
}
