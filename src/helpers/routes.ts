import Handlebars from 'handlebars';

import { routeConsts } from '../../config/routes';

Handlebars.registerHelper('routes', function (key) {
  return routeConsts[key] ?? '';
});
