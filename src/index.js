import { routeConsts, routes } from './config/routes';
import Handlebars from 'handlebars';
import './index.scss';

Handlebars.registerHelper('routes', function (key) {
  return routeConsts[key] ?? '';
});

const renderPage = (page) => {
  const rootElement = document.getElementById('app');
  rootElement.innerHTML = page();
};

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];
  renderPage(page);
};

window.addEventListener('load', handleRoute);
