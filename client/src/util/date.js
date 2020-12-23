import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

/**
 * Convert a data string into a time ago string
 * @param {String} date from JSON
 * @returns {String} mins/hours elapsed ex "1 min ago"
 */
export function stringToTimeAgo(date) {
  if (!date || !Date.parse(date)) {
    return date;
  }

  const time = new Date(date);

  return timeAgo.format(time);
}
