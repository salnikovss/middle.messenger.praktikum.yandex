"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this._listeners = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event, callback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event, callback) {
        if (!this._listeners[event]) {
            return;
        }
        this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(event, ...args) {
        if (!this._listeners[event] || this._listeners[event].length === 0) {
            return;
        }
        this._listeners[event].forEach((listener) => {
            listener.apply(listener, args);
        });
    }
    destroy() {
        this._listeners = {};
    }
}
exports.default = EventBus;
//# sourceMappingURL=EventBus.js.map