import Handlebars from 'handlebars';

Handlebars.registerHelper('getTime', function (date) {
  try {
    return [date.getHour(), date.getMinutes()].join(':');
  } catch {
    return '';
  }
});
