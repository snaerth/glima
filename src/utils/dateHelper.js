const months = "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split(
  "_"
);

const INVALID_DATE = "Invalid date";

/**
 * Formats date to DD. monthname YYYY - HH:MM
 * @param {Object|String} date - Date string or object
 * @param {Boolean} showClock - If true then how clock
 * @returns {String} DD. monthname YYYY - HH:MM
 */
function formatDate(date, showClock = true) {
  if (!date) {
    return INVALID_DATE;
  }

  try {
    // This is for mobile issues, all browser support ISO8601 format
    if (date.includes(" ")) {
      date = date.replace(" ", "T");
      date = date + "Z";
    }

    const dateObj = new Date(date);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    hours = hours.toString().length === 1 ? `0${hours}` : hours;
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;

    const formattedDate = `${dateObj.getDate()}. ${
      months[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
    const time = `${hours}:${minutes}`;

    if (showClock) {
      return `${formattedDate} - ${time}`;
    }

    return formattedDate;
  } catch (error) {
    console.error(error);

    return INVALID_DATE;
  }
}

export default formatDate;
