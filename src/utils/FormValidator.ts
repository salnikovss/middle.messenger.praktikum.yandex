type ValidationValue = string | number;
type ValidationParams = Record<string, unknown>;
type ValidatorFunction = (value: ValidationValue, params?: ValidationParams) => boolean;
type Validator = (value: ValidationValue) => string | void;

const createValidator = (validator: ValidatorFunction, message?: string): Validator => {
  return (value: ValidationValue) => {
    if (validator(value) === false) {
      return message;
    }
  };
};

// Validator functions
const validateRequired = (value: ValidationValue) => {
  return value.toString().length > 0;
};

type validateLengthParams = { min?: number; max?: number };
const validateLength =
  ({ min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY }: validateLengthParams) =>
  (value: ValidationValue) => {
    const valueLength = value.toString().length;
    return min <= valueLength && valueLength <= max;
  };

type validateRegexpParams = { regexp: RegExp };
const validateRegexp =
  ({ regexp }: validateRegexpParams) =>
  (value: ValidationValue) => {
    return regexp.test(value.toString());
  };

// Validators
type ValidatorCreator = (message?: string) => Validator;
type ValidatorCreatorWithParams<T> = (params: T, message?: string) => Validator;

const required: ValidatorCreator = (message = 'Поле обязательно к заполнению') =>
  createValidator(validateRequired, message);

const length: ValidatorCreatorWithParams<validateLengthParams> = (params, message?) =>
  createValidator(validateLength(params), message || `Поле должно быть от ${params.min} до ${params.max} символов`);

const regexp: ValidatorCreatorWithParams<validateRegexpParams> = (params, message?) =>
  createValidator(validateRegexp(params), message || `Значение должно соответствовать заданной маске`);

export const v = { required, length, regexp };

type ValidationRules = Record<string, Validator[]>;

export default class FormValidator {
  constructor(private rules: ValidationRules) {}

  validate(data: Record<keyof typeof this.rules, ValidationValue>) {
    const validationResults: Record<string, string[]> = {};
    // const validationResult: Record<keyof typeof this.rules, string[]> = {};

    Object.entries(data).forEach(([fieldName, value]) => {
      const fieldValidationRules = this.rules[fieldName];

      fieldValidationRules?.forEach((fn) => {
        const validationResult = fn(value);
        if (validationResult) {
          if (!validationResults[fieldName]) {
            validationResults[fieldName] = [];
          }
          validationResults[fieldName].push(validationResult);
        }
      });
    });

    return validationResults;
  }
}

// Test
/*
const rules: ValidationRules = {
  login: [v.required(), v.length({ min: 3, max: 20 }), v.regexp({ regexp: /^[A-ZА-Я][а-яa-z-]*[а-яa-z]$/ })],
};

const validator = new FormValidator(rules);
const validate = validator.validate({ login: 'Fа' });

// eslint-disable-next-line no-console
console.log(validate);
*/
