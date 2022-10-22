import { ValidationRules, ValidationValue } from './types';

export default class FormValidator {
  private _hasErrors = false;

  constructor(private rules: ValidationRules) {}

  get hasErrors() {
    return this._hasErrors;
  }

  validate(data: Record<keyof typeof this.rules, ValidationValue>, stopOnError = true) {
    const validationResults: Record<string, string[]> = {};
    this._hasErrors = false;

    Object.entries(data).forEach(([fieldName, value]) => {
      const fieldValidationRules = this.rules[fieldName];

      for (let i = 0; i < fieldValidationRules.length; i++) {
        const fn = fieldValidationRules[i];
        const validationResult = fn(value);
        if (validationResult) {
          if (!validationResults[fieldName]) {
            validationResults[fieldName] = [];
          }

          validationResults[fieldName].push(validationResult);
          this._hasErrors = true;
          if (stopOnError) {
            break;
          }
        }
      }
    });

    return validationResults;
  }
}
