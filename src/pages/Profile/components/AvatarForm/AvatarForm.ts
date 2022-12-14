import './AvatarForm.scss';

import FormGroup from 'components/FormGroup';
import Component from 'core/Component';
import { updateProfileAvatar } from 'services/user';
import Form from 'utils/Form';
import withStore from 'utils/withStore';

import { predefinedRules } from '../../../../utils/FormValidator/predefinedRules';
import isEqual from '../../../../utils/isEqual';
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
    this.setProps({
      formError: () => this.props.store?.getState().formError,
    });

    this._eventBus.on(Component.EVENTS.COMPONENT_DID_MOUNT, this.updateFormRefs.bind(this));
    this._eventBus.on(Component.EVENTS.COMPONENT_DID_UPDATE, this.updateFormRefs.bind(this));
  }

  updateFormRefs(): void {
    // Set form refs after compontent has been mounted or updated
    const { fileInputRef } = this.refs as unknown as Record<string, FormGroup>;
    this.form.setRefs({ file: fileInputRef });
  }

  componentDidUpdate(oldProps: AvatarFormProps, newProps: AvatarFormProps): boolean {
    return !isEqual(oldProps.store as Indexed, newProps.store as Indexed);
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
          {{{Error className='error_form' text=formError}}}
          {{{FileInput name='file' ref='fileInputRef' type='${InputType.FILE}'
              onChange=onFileInputChange
              accept="image/*" placeholder='???????????????? ????????<br>???? ????????????????????'}}}

          {{#Button}}????????????????{{/Button}}
        </form>
      </div>
    `;
  }
}

export default withStore(AvatarForm);
