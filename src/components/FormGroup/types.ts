import Error from 'components/Error';
import Input, { InputProps } from 'components/Input';

import { ErrorProps } from '../Error/types';

export type FormGroupProps = InputProps &
  ErrorProps & {
    label?: string;
    inputRef?: Input;
    errorRef?: Error;
    textarea?: boolean;
  };
