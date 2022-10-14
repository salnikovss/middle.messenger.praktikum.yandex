"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
 */
const diffObjectsDeep = {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function (obj1, obj2) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
            const type = this.compareValues(obj1, obj2);
            if (type === this.VALUE_UNCHANGED) {
                return;
            }
            return {
                type,
                data: obj1 === undefined ? obj2 : obj1,
            };
        }
        const diff = {};
        for (const key in obj1) {
            if (this.isFunction(obj1[key])) {
                continue;
            }
            let value2 = undefined;
            if (obj2 && obj2[key] !== undefined) {
                value2 = obj2[key];
            }
            diff[key] = this.map(obj1[key], value2);
        }
        for (const key in obj2) {
            if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                continue;
            }
            diff[key] = this.map(undefined, obj2[key]);
        }
        return diff;
    },
    compareValues: function (value1, value2) {
        if (value1 === value2) {
            return this.VALUE_UNCHANGED;
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
            return this.VALUE_UNCHANGED;
        }
        if (value1 === undefined) {
            return this.VALUE_CREATED;
        }
        if (value2 === undefined) {
            return this.VALUE_DELETED;
        }
        return this.VALUE_UPDATED;
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    isFunction: function (x) {
        return Object.prototype.toString.call(x) === '[object Function]';
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isArray: function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x) {
        return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x) {
        return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x) {
        return !this.isObject(x) && !this.isArray(x);
    },
};
exports.default = diffObjectsDeep;
//# sourceMappingURL=diffObjectsDeep.js.map