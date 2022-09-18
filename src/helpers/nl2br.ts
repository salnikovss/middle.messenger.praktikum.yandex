import Handlebars from 'handlebars';

import nl2br from '../utils/nl2br';

Handlebars.registerHelper('nl2br', function (message) {
  return nl2br(message);
});
