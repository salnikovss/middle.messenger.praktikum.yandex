"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = __importDefault(require("./EventBus"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Store extends EventBus_1.default {
    constructor(defaultState) {
        super();
        this.state = {};
        this.state = defaultState;
        this.set(defaultState);
    }
    getState() {
        return this.state;
    }
    set(nextState) {
        const prevState = Object.assign({}, this.state);
        this.state = Object.assign(Object.assign({}, this.state), nextState);
        this.emit('changed', prevState, nextState);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(nextStateOrAction, payload) {
        if (typeof nextStateOrAction === 'function') {
            nextStateOrAction(this.dispatch.bind(this), this.state, payload);
        }
        else {
            this.set(Object.assign(Object.assign({}, this.state), nextStateOrAction));
        }
    }
}
exports.default = Store;
//# sourceMappingURL=Store.js.map