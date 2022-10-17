import './AvatarForm.scss';

import FormGroup from 'components/FormGroup';
import Modal from 'components/Modal';
import Component from 'core/Component';
import { updateProfileAvatar } from 'services/user';
import { Form } from 'utils';
import withStore from 'utils/withStore';

import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';
import { InputType } from './../../../../components/Input/types';
import { AvatarFormProps } from './types';

class AvatarForm extends Component<AvatarFormProps> {
  static componentName = 'AvatarForm';
  public form: Form = new Form({
    file: predefinedRules.avatar,
  });

  constructor({ ...rest }: AvatarFormProps) {
    super({
      ...rest,
      onFileInputChange: () => this.form.validate('file'),
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      },
    });
  }

  componentDidMount(): void {
    // Set form refs after compontent has been mounted
    const { fileInputRef } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ file: fileInputRef });
  }

  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.form.validate();

    if (!this.form.hasErrors) {
      const { element: fileInput } = this.refs.fileInputRef.refs.inputRef;
      const fileList = (fileInput as HTMLInputElement)?.files;
      if (fileList && fileList.length > 0) {
        this.props.store.dispatch(updateProfileAvatar, { file: fileList[0] });
      }
    }
  }

  render() {
    //template=hbs
    return `
      <div class='avatar-form'>
        <form class='avatar-form__form'>
          {{{FileInput name='file' ref='fileInputRef' type='${InputType.FILE}'
              onChange=onFileInputChange
              accept="image/*" placeholder='Выберите файл<br>на компьютере'}}}

          {{#Button}}Обновить{{/Button}}
        </form>
      </div>
    `;
  }
}

export default withStore(AvatarForm);
