"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormValidator_1 = __importDefault(require("./FormValidator"));
class Form {
    constructor(rules) {
        this.rules = rules;
        this.refs = {};
        this.hasErrors = false;
        this.formValidator = new FormValidator_1.default(this.rules);
    }
    setRefs(refs) {
        this.refs = refs;
    }
    validate(field) {
        var _a, _b;
        const values = this.getValues();
        const fieldsToValidate = field ? { [field]: values[field] } : values;
        const validationResult = (_a = this.formValidator) === null || _a === void 0 ? void 0 : _a.validate(fieldsToValidate);
        this.hasErrors = (_b = this.formValidator) === null || _b === void 0 ? void 0 : _b.hasErrors;
        if (this.hasErrors && validationResult) {
            Object.entries(validationResult).forEach(([key, errors]) => {
                this.refs[key].setError(errors.join('. '));
            });
        }
        return validationResult;
    }
    getValues() {
        const values = {};
        Object.entries(this.refs).forEach(([key, ref]) => {
            const value = ref.refs.inputRef.getContent().value;
            values[key] = value;
        });
        return values;
    }
}
exports.default = Form;
//# sourceMappingURL=Form.js.map