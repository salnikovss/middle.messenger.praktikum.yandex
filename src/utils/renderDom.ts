import Component from './Component';

export const renderDom = (content: Component | string, elementId = 'app') => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    if (content instanceof Component) {
      rootElement.appendChild(content.render());
      content.dispatchComponentDidMount();
    } else {
      rootElement.innerHTML = content;
    }
  }
};

export default renderDom;
