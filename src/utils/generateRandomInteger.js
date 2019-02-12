/**
 * Generates random integer between two numbers
 *
 * @param {Number} min - Minimum number
 * @param {Number} max - Maximum number
 * @returns {Number} random number
 */
export default function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
