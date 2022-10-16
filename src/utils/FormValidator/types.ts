// Main types
export type ValidationValue = string;
export type ValidationParams = Record<string, unknown>;
export type ValidatorFunction = (value: ValidationValue, params?: ValidationParams) => boolean;
export type Validator = (value: ValidationValue) => string | void;

// Params types
export type ValidateLengthParams = { min?: number; max?: number };
export type ValidateRegexpParams = { regexp: RegExp };

// Validator types
export type ValidatorCreator = (message?: string) => Validator;
export type ValidatorCreatorWithParams<T> = (params: T, message?: string) => Validator;

export type ValidationRules = Record<string, Validator[]>;
