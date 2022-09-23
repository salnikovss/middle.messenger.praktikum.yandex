import Component from './Component';

export const renderDOM = (component: Component, elementId: string) => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    rootElement.innerHTML = '';
    const content = component.getContent();
    if (content) {
      rootElement.appendChild(content);
      // component.dispatchComponentDidMount();
    }
  }
};

export default renderDOM;
