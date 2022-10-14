"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = void 0;
const createValidator = (validator, message) => {
    return (value) => {
        if (validator(value) === false) {
            return message;
        }
    };
};
// Validator functions
const validateRequired = (value) => {
    return value.toString().length > 0;
};
const validateEmail = (value) => {
    return /^[a-z0-9.+-]+@[a-z]+.[a-z0-9.-]*[a-z]$/i.test(value.toString());
};
const validateLength = ({ min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY }) => (value) => {
    const valueLength = value.toString().length;
    return min <= valueLength && valueLength <= max;
};
const validateRegexp = ({ regexp }) => (value) => {
    return regexp.test(value.toString());
};
// Validators
const required = (message = 'Поле обязательно к заполнению') => createValidator(validateRequired, message);
const email = (message = 'Введите корректный email') => createValidator(validateEmail, message);
const length = (params, message) => createValidator(validateLength(params), message || `Поле должно быть от ${params.min} до ${params.max} символов`);
const regexp = (params, message) => createValidator(validateRegexp(params), message || `Значение должно соответствовать заданной маске`);
exports.v = { required, length, regexp, email };
//# sourceMappingURL=validationFunctions.js.map