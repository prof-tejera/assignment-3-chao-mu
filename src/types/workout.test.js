// Jest
import { describe, expect, test } from "vitest";

// Ours - Tested functions
import { removeTimer } from "./workout";

// uuid
import { v4 as uuidv4 } from "uuid";

const createMockTimerOptions = ({
  id = null,
  type = "Test timer",
  workDuration = 1,
  restDuration = 0,
  rounds = 1,
  countUp = false,
} = {}) => ({
  type,
  workDuration,
  restDuration,
  rounds,
  countUp,
  id: id === null ? uuidv4() : id,
});

const createMockPlan = (length) =>
  Array.from({ length }, () => createMockTimerOptions());

describe("Workout", () => {
  test("Removing selected timer selects next timer, if first", () => {
    const initialLength = 3;

    const state = {
      plan: createMockPlan(initialLength),
      cursor: 0,
    };

    const selectedId = state.plan[state.cursor].id;
    const nextId = state.plan[state.cursor + 1].id;

    const removedId = selectedId;
    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer({
      state,
      id: removedId,
    });

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedCursor).toBe(0);
    expect(updatedPlan[updatedCursor].id).toBe(nextId);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
  });

  test("Removing timer after selection does not change selection", () => {
    const initialCursor = 1;
    const initialLength = 3;

    const state = {
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    };

    const selectedId = state.plan[state.cursor].id;
    const removedId = state.plan[initialCursor + 1].id;

    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer({
      state,
      id: removedId,
    });

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
    expect(updatedPlan[updatedCursor].id).toBe(selectedId);
  });

  test("Removing timer before selected timer doesn't change selection", () => {
    const initialCursor = 1;
    const initialLength = 3;

    const state = {
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    };

    const selectedId = state.plan[state.cursor].id;
    const removedId = state.plan[state.cursor - 1].id;

    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer({
      state,
      id: removedId,
    });

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
    expect(updatedPlan[updatedCursor].id).toBe(selectedId);
  });

  test("Removing selected timer selects previous timer, if last", () => {
    const initialLength = 3;
    const initialCursor = initialLength - 1;

    const state = {
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    };

    const selectedId = state.plan[state.cursor].id;
    const previousId = state.plan[state.cursor - 1].id;

    const removedId = selectedId;
    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer({
      state,
      id: removedId,
    });

    const expectedCursor = initialCursor - 1;

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedCursor).toBe(expectedCursor);
    expect(updatedPlan[updatedCursor].id).toBe(previousId);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
  });
});
