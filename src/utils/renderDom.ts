// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderDom = (page: any) => {
  const rootElement = document.getElementById('app');
  if (rootElement) {
    rootElement.innerHTML = page();
  }
};

export default renderDom;
