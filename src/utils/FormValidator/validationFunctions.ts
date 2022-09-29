import {
  ValidateLengthParams,
  ValidateRegexpParams,
  ValidationValue,
  Validator,
  ValidatorCreator,
  ValidatorCreatorWithParams,
  ValidatorFunction,
} from './types';

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

const validateEmail = (value: ValidationValue) => {
  return /^[a-z0-9.+-]+@[a-z]+.[a-z0-9.-]*[a-z]$/i.test(value.toString());
};

const validateLength =
  ({ min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY }: ValidateLengthParams) =>
  (value: ValidationValue) => {
    const valueLength = value.toString().length;
    return min <= valueLength && valueLength <= max;
  };

const validateRegexp =
  ({ regexp }: ValidateRegexpParams) =>
  (value: ValidationValue) => {
    return regexp.test(value.toString());
  };

// Validators
const required: ValidatorCreator = (message = 'Поле обязательно к заполнению') =>
  createValidator(validateRequired, message);

const email: ValidatorCreator = (message = 'Введите корректный email') => createValidator(validateEmail, message);

const length: ValidatorCreatorWithParams<ValidateLengthParams> = (params, message?) =>
  createValidator(validateLength(params), message || `Поле должно быть от ${params.min} до ${params.max} символов`);

const regexp: ValidatorCreatorWithParams<ValidateRegexpParams> = (params, message?) =>
  createValidator(validateRegexp(params), message || `Значение должно соответствовать заданной маске`);

export const v = { required, length, regexp, email };
