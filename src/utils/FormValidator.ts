/**** How to use 
  const rules: ValidationRules = {
    first_name: [v.required(), v.regexp({ regexp: RegexpPatterns.firstLastName })],
    login: [v.required(), v.length({ min: 3, max: 20 }), v.regexp({ regexp: RegexpPatterns.login })],
    email: [v.required(), v.email()],
    password: [v.required(), v.length({ min: 8, max: 40 }), v.regexp({ regexp: RegexpPatterns.password })],
    phone: [v.required(), v.length({ min: 10, max: 15 }), v.regexp({ regexp: RegexpPatterns.phone })],
    message: [v.required()],
  };

  const validator = new FormValidator(rules);
  const validate = validator.validate({
    first_name: 'Fаf',
    login: '333333df',
    email: 'delfi89+df@gmail.com.ru',
    password: 'sdfsdfsdfsdfsdfG4',
    phone: '+79215555555',
    message: 'ccddf',
  });

  // eslint-disable-next-line no-console
  console.log(validate);
*/

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

const validateEmail = (value: ValidationValue) => {
  return /^[a-z0-9.+-]+@[a-z]+.[a-z0-9.-]*[a-z]$/i.test(value.toString());
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

const email: ValidatorCreator = (message = 'Введите корректный email') => createValidator(validateEmail, message);

const length: ValidatorCreatorWithParams<validateLengthParams> = (params, message?) =>
  createValidator(validateLength(params), message || `Поле должно быть от ${params.min} до ${params.max} символов`);

const regexp: ValidatorCreatorWithParams<validateRegexpParams> = (params, message?) =>
  createValidator(validateRegexp(params), message || `Значение должно соответствовать заданной маске`);

export const v = { required, length, regexp, email };

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

export const RegexpPatterns = {
  // capitilized, one word, only letters, with dash in the middle, without spaces
  firstLastName: /^[A-ZА-Я][а-яa-z-]*[а-яa-z]$/,
  // at least 1 letter, numbers, with dash and underscore, without spaces
  login: /^(?=.*?[a-z])[a-z\d-_]+$/i,
  // at least one symbol and number
  password: /^(?=.*?[0-9])(?=.*?[A-Z]).*$/,
  // can starts with +, only numbers
  phone: /^\+?[\d]+$/,
};

export const PredefinedRules: ValidationRules = {
  first_name: [v.required(), v.regexp({ regexp: RegexpPatterns.firstLastName })],
  last_name: [v.required(), v.regexp({ regexp: RegexpPatterns.firstLastName })],
  login: [v.required(), v.length({ min: 3, max: 20 }), v.regexp({ regexp: RegexpPatterns.login })],
  email: [v.required(), v.email()],
  password: [v.required(), v.length({ min: 8, max: 40 }), v.regexp({ regexp: RegexpPatterns.password })],
  phone: [v.required(), v.length({ min: 10, max: 15 }), v.regexp({ regexp: RegexpPatterns.phone })],
  message: [v.required()],
};
