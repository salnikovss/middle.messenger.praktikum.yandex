export const renderDom = (html: string, elementId = 'app') => {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    rootElement.innerHTML = html;
  }
};

export default renderDom;
