import { routeConsts, routes } from '../config/routes';
import './index.scss';
import './helpers/handlebar-helpers';

const renderPage = (page) => {
  const rootElement = document.getElementById('app');
  rootElement.textContent = page();
};

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];
  renderPage(page);
};

window.addEventListener('load', handleRoute);
