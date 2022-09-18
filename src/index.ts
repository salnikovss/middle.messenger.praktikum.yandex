import './index.scss';
import './helpers/handlebar-helpers';

import { routeConsts, routes } from '../config/routes';
import renderDom from './utils/renderDom';

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];

  const html = page();
  renderDom(html);
};

window.addEventListener('load', handleRoute);
