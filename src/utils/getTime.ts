export default function getTime(date: Date) {
  try {
    const dateObj = new Date(date);
    return [dateObj.getHours(), dateObj.getMinutes()].join(':');
  } catch {
    return '';
  }
}
