"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormValidator {
    constructor(rules) {
        this.rules = rules;
        this._hasErrors = false;
    }
    get hasErrors() {
        return this._hasErrors;
    }
    validate(data, stopOnError = true) {
        const validationResults = {};
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
exports.default = FormValidator;
//# sourceMappingURL=FormValidator.js.map