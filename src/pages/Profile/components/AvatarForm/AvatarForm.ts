import './AvatarForm.scss';

import Component from 'core/Component';
import { Form } from 'utils';

import { InputType } from './../../../../components/Input/types';
import { AvatarFormProps } from './types';
import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';

export default class AvatarForm extends Component<AvatarFormProps> {
  static componentName = 'AvatarForm';
  public form: Form = new Form({
    login: predefinedRules.avatar,
    password: predefinedRules.password,
  });

  constructor({ ...rest }: AvatarFormProps) {
    super({
      ...rest,
      onClick: (e) => {
        e.preventDefault();
        this.refs.modalRef.element?.classList.add('modal_show');
      },
    });
  }

  render() {
    //template=hbs
    return `
      <div class='avatar-form'>
        {{{FileInput name='file' type='${InputType.FILE}' placeholder='Выберите файл<br>на компьютере'}}}
        {{#Button}}Обновить{{/Button}}
      </div>
    `;
  }
}
