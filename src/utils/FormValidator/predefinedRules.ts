import { ValidationRules } from './types';
import { v } from './validationFunctions';

export const regexpPatterns = {
  // capitilized, one word, only letters, with dash in the middle, without spaces
  firstLastName: /^[A-ZА-Я][а-яa-z-]*[а-яa-z]$/,
  // one word, only letters, with dash in the middle
  displayName: /^[а-яa-z\s\d]*$/i,
  // at least 1 letter, numbers, with dash and underscore, without spaces
  login: /^(?=.*?[a-z])[a-z\d-_]+$/i,
  // at least one symbol and number
  password: /^(?=.*?[0-9])(?=.*?[A-Z]).*$/,
  // can starts with +, only numbers
  phone: /^\+?[\d]+$/,
};

export const predefinedRules: ValidationRules = {
  chet_title: [v.required()],
  first_name: [
    v.required(),
    v.regexp({ regexp: regexpPatterns.firstLastName }, 'Имя должно содержать только буквы, без пробелов'),
  ],
  second_name: [
    v.required(),
    v.regexp({ regexp: regexpPatterns.firstLastName }, 'Фамилия должна содержать только буквы, без пробелов'),
  ],
  display_name: [
    v.required(),
    v.regexp({ regexp: regexpPatterns.displayName }, 'Отображаемое имя должно содержать буквы, цифры'),
  ],
  login: [
    v.required(),
    v.length({ min: 3, max: 20 }),
    v.regexp(
      { regexp: regexpPatterns.login },
      'Логин может содержать хотя бы одну латинскую букву, цифры и символы "_-"'
    ),
  ],
  email: [v.required(), v.email()],
  password: [
    v.required(),
    v.length({ min: 8, max: 40 }),
    v.regexp({ regexp: regexpPatterns.password }, 'Пароль должен содерхать хотя бы одну цифру и заглавную букву'),
  ],
  phone: [
    v.required(),
    v.length({ min: 10, max: 15 }),
    v.regexp({ regexp: regexpPatterns.phone }, 'Пароль должен может содержать знак + и состоять только из цифр'),
  ],
  message: [v.required()],
  avatar: [v.required()],
};
