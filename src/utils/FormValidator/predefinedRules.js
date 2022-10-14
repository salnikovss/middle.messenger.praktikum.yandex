"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predefinedRules = exports.regexpPatterns = void 0;
const validationFunctions_1 = require("./validationFunctions");
exports.regexpPatterns = {
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
exports.predefinedRules = {
    first_name: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.firstLastName }, 'Имя должно содержать только буквы, без пробелов'),
    ],
    second_name: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.firstLastName }, 'Фамилия должна содержать только буквы, без пробелов'),
    ],
    display_name: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.displayName }, 'Отображаемое имя должно содержать буквы, цифры'),
    ],
    login: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.length({ min: 3, max: 20 }),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.login }, 'Логин может содержать хотя бы одну латинскую букву, цифры и символы "_-"'),
    ],
    email: [validationFunctions_1.v.required(), validationFunctions_1.v.email()],
    password: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.length({ min: 8, max: 40 }),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.password }, 'Пароль должен содерхать хотя бы одну цифру и заглавную букву'),
    ],
    phone: [
        validationFunctions_1.v.required(),
        validationFunctions_1.v.length({ min: 10, max: 15 }),
        validationFunctions_1.v.regexp({ regexp: exports.regexpPatterns.phone }, 'Пароль должен может содержать знак + и состоять только из цифр'),
    ],
    message: [validationFunctions_1.v.required()],
};
//# sourceMappingURL=predefinedRules.js.map