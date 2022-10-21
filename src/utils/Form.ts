import FormGroup from 'components/FormGroup';
import ProfileFormRow from 'pages/Profile/components/ProfileFormRow';

import FileInput from '../components/FileInput/FileInput';
import FormValidator, { ValidationRules, ValidationValue } from './FormValidator';

type RefTypes = ProfileFormRow | FormGroup | FileInput;

export default class Form {
  private formValidator: FormValidator;
  private refs: Record<string, RefTypes> = {};
  public hasErrors = false;

  constructor(private rules: ValidationRules) {
    this.formValidator = new FormValidator(this.rules);
  }

  setRefs(refs: Record<string, RefTypes>) {
    this.refs = refs;
  }

  validate(field?: string) {
    const values = this.getValues();

    const fieldsToValidate = field ? { [field]: values[field] } : values;
    const validationResult = this.formValidator?.validate(fieldsToValidate);

    this.hasErrors = this.formValidator?.hasErrors;

    if (this.hasErrors && validationResult) {
      Object.entries(validationResult).forEach(([key, errors]) => {
        this.refs[key].setError(errors.join('. '));
      });
    }

    return validationResult;
  }

  getValues(): Record<string, ValidationValue> {
    const values: Record<string, ValidationValue> = {};
    Object.entries(this.refs).forEach(([key, ref]) => {
      const value = (ref.refs.inputRef.getContent() as HTMLInputElement).value;
      values[key] = value;
    });

    return values;
  }
}
