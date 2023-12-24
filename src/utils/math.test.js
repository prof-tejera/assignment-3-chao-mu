// Vitest
import { describe, test, expect } from "vitest";

// Ours - Tested functions
import { findNearestNumber } from "./math";

describe("math", () => {
  test("findNearestNumber", () => {
    const numbers = [-20, -10, 0, 10, 20];
    const cases = {
      ...Object.fromEntries(numbers.map((n) => [n, n])),
      ...Object.fromEntries(numbers.map((n) => [n + 0.1, n])),
      ...Object.fromEntries(numbers.map((n) => [n - 0.1, n])),
    };

    // Verify the integrity of our test cases, since supplied by a human
    for (const expected of Object.values(cases)) {
      if (!numbers.includes(expected)) {
        throw new Error(
          `Test case ${expected} is not a member of the numbers array`,
        );
      }
    }

    for (const [value, expected] of Object.entries(cases)) {
      expect(findNearestNumber(Number(value), numbers)).toBe(expected);
    }
  });
});
