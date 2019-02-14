const months = "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split(
  "_"
);

/**
 * Formats date to DD. monthname YYYY - HH:MM
 * @param {Object|String} date - Date string or object
 * @param {Boolean} showClock - If true then how clock
 * @returns {String} DD. monthname YYYY - HH:MM
 */
function formatDate(date, showClock = true) {
  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getDate()}. ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;
  const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

  if (showClock) {
    return `${formattedDate} - ${time}`;
  }

  return formattedDate;
}

export default formatDate;
