// Jest
import { vi, beforeEach, describe, expect, test } from "vitest";

// Ours - Reducers
import { clockReducer, ClockActionType } from "./clockReducer";

// Ours - Types
import { createClock, getElapsed } from "@/types/clock";

const createMockClock = () => createClock();

describe("clockReducer", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  test("end to end", () => {
    let clock = createMockClock();

    // Should start paused
    expect(clock.paused).toBe(true);

    // Should start with 0 seconds elapsed
    expect(getElapsed(clock)).toBe(0);

    // Start the clock
    clock = clockReducer(clock, {
      type: ClockActionType.RESUME,
    });

    expect(clock.paused).toBe(false);

    const expectedElapsed = 1000;
    vi.setSystemTime(clock.startedAt + expectedElapsed);

    // Should have at least elapsed
    expect(getElapsed(clock)).toBeGreaterThanOrEqual(expectedElapsed);

    // Reset clock
    clock = clockReducer(clock, {
      type: ClockActionType.RESET,
    });

    // Reset should pause and set elapsed to 0
    expect(clock.paused).toBe(true);
    expect(getElapsed(clock)).toBe(0);

    // Resume the clock
    clock = clockReducer(clock, {
      type: ClockActionType.RESUME,
    });

    // Should be unpaused
    expect(clock.paused).toBe(false);

    // 100 days, assuming this test wont take more than 50 days to complete
    const longElapsed = 1000 * 60 * 60 * 24 * 100;
    const halfLongElapsed = longElapsed / 2;

    // Make that time elapsed
    vi.setSystemTime(clock.startedAt + expectedElapsed);

    // Should have at least elapsed
    expect(getElapsed(clock)).toBeGreaterThanOrEqual(expectedElapsed);

    // Restart the clock
    clock = clockReducer(clock, {
      type: ClockActionType.RESTART,
    });

    // Should be unpaused
    expect(clock.paused).toBe(false);

    // Should immediately start a 0, but we can't predict time between statements
    expect(getElapsed(clock)).toBeLessThan(halfLongElapsed);
  });
});
