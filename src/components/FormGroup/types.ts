import { IComponentProps } from '../../utils/Component';
import { IInputProps } from '../Input';

export interface IFormGroupProps extends IComponentProps {
  label?: string;
  input: IInputProps;
}
