import Error, { ErrorProps } from 'components/Error';
import { Input } from 'components/Input/Input';
import { InputProps } from 'components/Input/types';

export type ProfileFormRowProps = InputProps &
  ErrorProps & {
    label?: string;
    inputRef?: Input;
    errorRef?: Error;
  };
