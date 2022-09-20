import './index.scss';
import './helpers/handlebar-helpers';

import { routeConsts, routes } from '../config/routes';
import Component from './utils/Component';
import renderDom from './utils/renderDom';

const handleRoute = () => {
  const { pathname } = document.location;
  const page = routes[pathname] ?? routes[routeConsts.ERROR404];

  const component = page() as string | Component;
  renderDom(component, 'app');
};

window.addEventListener('load', handleRoute);
