import Handlebars from 'handlebars';

Handlebars.registerHelper('getTime', function (date) {
  try {
    const dateObj = new Date(date);
    return [dateObj.getHours(), dateObj.getMinutes()].join(':');
  } catch {
    return '';
  }
});
