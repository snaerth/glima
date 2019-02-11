/**
 * Capitalizes first letter in string
 *
 * @param {String} string
 * @returns {String} with first letter capatalized
 */
export default function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
