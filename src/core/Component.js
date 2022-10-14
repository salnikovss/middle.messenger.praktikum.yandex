"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const nanoid_1 = require("nanoid");
const EventBus_1 = __importDefault(require("./EventBus"));
class Component {
    constructor(props = {}) {
        this._element = null;
        this.id = (0, nanoid_1.nanoid)(6);
        this.refs = {};
        this.children = {};
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus_1.default();
        this.props = this._makePropsProxy(props);
        this._eventBus = eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Component.EVENTS.INIT, this.props);
    }
    _registerEvents(eventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this._eventBus.emit(Component.EVENTS.FLOW_RENDER, this.props);
    }
    _componentDidMount(props) {
        this.componentDidMount(props);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidMount(_props) { }
    _componentWillUnmount() {
        this._eventBus.destroy();
        this.componentWillUnmount();
    }
    componentWillUnmount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }
    componentDidUpdate(oldProps, newProps) {
        return true;
        return oldProps !== newProps;
    }
    get element() {
        return this._element;
    }
    _render() {
        const fragment = this._compile();
        this._removeEvents();
        if (fragment.firstElementChild) {
            const newElement = fragment.firstElementChild;
            if (this._element) {
                this._element.replaceWith(newElement);
            }
            this._element = newElement;
            this._addEvents();
        }
    }
    _compile() {
        const fragment = document.createElement('template');
        const template = handlebars_1.default.compile(this.render());
        fragment.innerHTML = template(Object.assign(Object.assign({}, this.props), { children: this.children, refs: this.refs }));
        // Replace stubs with components
        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);
            if (!stub) {
                return;
            }
            const stubChilds = stub.childNodes.length ? stub.childNodes : [];
            const content = component.getContent();
            stub.replaceWith(content);
            // Paste content to layout
            const layoutContent = content.querySelector('[data-slot="1"]');
            if (layoutContent && stubChilds.length) {
                layoutContent.replaceWith(...stubChilds);
            }
        });
        return fragment.content;
    }
    _removeEvents() {
        if (this.props.events) {
            Object.entries(this.props.events).forEach(([event, listener]) => {
                var _a;
                (_a = this._element) === null || _a === void 0 ? void 0 : _a.removeEventListener(event, listener);
            });
        }
    }
    _addEvents() {
        if (this.props.events) {
            Object.entries(this.props.events).forEach(([event, listener]) => {
                var _a;
                (_a = this._element) === null || _a === void 0 ? void 0 : _a.addEventListener(event, listener);
            });
        }
    }
    // Must be overridden by the user in the final component
    render() {
        return new DocumentFragment();
    }
    getContent() {
        var _a, _b;
        // Hack to call CDM only after adding to DOM
        if (((_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.nodeType) === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                var _a, _b;
                if (((_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.nodeType) !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
                }
            }, 100);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.element;
    }
    _makePropsProxy(props) {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                const oldProps = Object.assign({}, target);
                if (typeof target === 'object') {
                    target[prop] = value;
                }
                this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Permission denied');
            },
        });
    }
    show() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'block';
        }
    }
    hide() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'none';
        }
    }
}
exports.default = Component;
Component.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
};
//# sourceMappingURL=Component.js.map