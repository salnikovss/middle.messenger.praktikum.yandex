import Component from './Component';

export const renderDom = (component: Component | string, elementId = 'app') => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    if (component instanceof Component) {
      const content = component.getContent();
      if (content) {
        rootElement.appendChild(content);
        component.dispatchComponentDidMount();
      }
    } else {
      rootElement.innerHTML = component;
    }
  }
};

export default renderDom;