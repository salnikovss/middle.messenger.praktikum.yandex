import { routeConsts } from 'config/routes';
import Handlebars from 'handlebars';

Handlebars.registerHelper('routes', function (key: keyof typeof routeConsts) {
  return routeConsts[key] ?? '';
});
