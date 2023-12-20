// Jest
import { vi, describe, expect, test } from "vitest";

// Ours - Tested functions
import {
  setElapsed,
  getElapsed,
  createClock,
  pauseClock,
  resumeClock,
} from "./clock";

const createMockClock = () => createClock();

describe("Clock", () => {
  test("getElapsed/setElapsed symetry, initial state, paused", () => {
    const clock = pauseClock(createMockClock());

    const elapsed = getElapsed(clock);
    const newClock = setElapsed(clock, { elapsed });

    expect(getElapsed(newClock)).toBe(elapsed);
  });

  test("getElapsed/setElapsed symetry, non-zero elapsed, paused", () => {
    const clock = pauseClock(createMockClock());
    const expectedElapsed = 1000;

    const updatedClock = setElapsed(clock, { elapsed: expectedElapsed });
    const updatedElapsed = getElapsed(updatedClock);

    expect(updatedElapsed).toBe(expectedElapsed);
  });

  test("getElapsed/setElapsed symetry, initial state, running", () => {
    const clock = resumeClock(createMockClock());

    const elapsed = getElapsed(clock);
    const newClock = setElapsed(clock, { elapsed });

    expect(getElapsed(newClock)).toBe(elapsed);
  });

  test("getElapsed/setElapsed symetry, non-zero elapsed, running", () => {
    const clock = resumeClock(createMockClock());
    const expectedElapsed = 1000;

    const updatedClock = setElapsed(clock, { elapsed: expectedElapsed });
    const updatedElapsed = getElapsed(updatedClock);

    expect(updatedElapsed).toBe(expectedElapsed);
  });

  test("setElapsed to zero during pause should not stop time keeping after resume", () => {
    // Start a paused clock
    let clock = pauseClock(createMockClock());

    // Set elapsed to 0
    clock = setElapsed(clock, { elapsed: 0 });

    // Verify no time passed
    expect(getElapsed(clock)).toBe(0);

    // Resume the clock
    clock = resumeClock(clock);

    // Pass some time
    const atleastElapsed = 1000;
    vi.setSystemTime(clock.startedAt + atleastElapsed);

    // Verify time passed
    expect(getElapsed(clock)).toBeGreaterThanOrEqual(atleastElapsed);
  });

  test("setElapsed to zero while running should not stop time keeping after resume", () => {
    // Start a paused clock
    let clock = resumeClock(createMockClock());

    // Set elapsed to 0
    clock = setElapsed(clock, { elapsed: 0 });

    // Verify no time passed and we're still running
    expect(getElapsed(clock)).toBe(0);

    // Pass some time
    const atleastElapsed = 1000;
    vi.setSystemTime(clock.startedAt + atleastElapsed);

    // Verify time passed as expected
    expect(getElapsed(clock)).toBeGreaterThanOrEqual(atleastElapsed);
  });
});
