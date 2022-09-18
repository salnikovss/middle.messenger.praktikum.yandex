import './index.scss';
import './helpers/handlebar-helpers';

import { routeConsts, routes } from '../config/routes';
import renderDom from './utils/renderDom';

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];
  renderDom(page);
};

window.addEventListener('load', handleRoute);
