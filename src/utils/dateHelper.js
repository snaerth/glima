const months = "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split(
  "_"
);

/**
 * Formats date to DD. monthname YYYY HH:MM
 * @param {Object|String} date - Date string or object
 * @returns {String} DD. monthname YYYY HH:MM
 */
function formatDate(date) {
  const dateObj = new Date(date);

  return `${dateObj.getDate()}. ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

export default formatDate;
