"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDOM = void 0;
const renderDOM = (component, elementId) => {
    const rootElement = document.querySelector(elementId);
    if (rootElement) {
        rootElement.innerHTML = '';
        const content = component.getContent();
        if (content) {
            rootElement.appendChild(content);
        }
    }
};
exports.renderDOM = renderDOM;
exports.default = exports.renderDOM;
//# sourceMappingURL=renderDOM.js.map