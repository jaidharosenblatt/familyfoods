/**
 * Get the weighted average - each item is weighted exponentially less
 * the previous using a constant from environment variables
 * @param {Array} arr
 * @returns {Float} weighted average of this arr
 */
const getWeightedAverage = (arr) => {
  let weight = 1;
  let sum = 0;
  let weighted_sum = 0;
  const weightConstant = parseFloat(process.env.WEIGHT_CONST);
  for (let i = arr.length - 1; i >= 0; i--) {
    weight *= weightConstant;
    sum += weight;
    weighted_sum += arr[i] * weight;
  }
  return weighted_sum / sum;
};

/**
 * Shift the inputted array based off the number of turns taken
 * @param {Array} arr to shift
 * @param {Integer} turn number of iterations this arr has been through
 * @returns {Array} shifted array
 */
const shiftArray = (arr, turn) => {
  const n = arr.length;
  if (!arr || n === 0) {
    return [];
  }
  const shift = turn % n;
  const shifted = new Array(n);
  for (let i = 0; i < n; i++) {
    shifted[(i + shift) % n] = arr[i];
  }
  return shifted;
};

module.exports = { getWeightedAverage, shiftArray };
