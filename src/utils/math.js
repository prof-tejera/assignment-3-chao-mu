/**
 * Returns the nearest number in an array to the given value
 * @param {number} value - The value to find the nearest number to
 * @param {number[]} numbers - The array of numbers to search
 *
 * @returns {number} The nearest number to the given value
 */
export const findNearestNumber = (value, numbers) => {
  if (!numbers.length) {
    throw new Error("Cannot find nearest number in empty array");
  }

  return numbers.reduce(
    (prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
    numbers[0],
  );
};

export const sum = (numbers) => numbers.reduce((a, b) => a + b, 0);
