import Component from './Component';

export const renderDOM = (component: Component<Record<string, unknown>>, elementId: string) => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    rootElement.innerHTML = '';
    const content = component.getContent();
    if (content) {
      rootElement.appendChild(content);
    }
  }
};

export default renderDOM;
