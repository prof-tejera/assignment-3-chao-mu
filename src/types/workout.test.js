// Jest
import { describe, expect, test } from "vitest";

// Ours - Tested functions
import { removeTimer, signalTimerCompleted } from "./workout";

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

const createMockWorkout = ({ plan, cursor, completed = false }) => ({
  plan,
  cursor,
  completed,
});

describe("Workout", () => {
  test("When last timer completes, workout completes", () => {
    const plan = createMockPlan(3);
    const workout = createMockWorkout({
      plan: plan,
      cursor: plan.length - 1,
    });

    const lastId = workout.plan[workout.plan.length - 1].id;

    const { completed } = signalTimerCompleted(workout, { id: lastId });

    expect(completed).toBe(true);
  });

  test("When a non last timer completes, workout is not completed", () => {
    const planlength = 3;
    const notLastCursor = planlength - 2;

    const workout = createMockWorkout({
      plan: createMockPlan(3),
      cursor: notLastCursor,
    });

    const notLastId = workout.plan[notLastCursor].id;

    const { completed } = signalTimerCompleted(workout, { id: notLastId });

    expect(completed).toBe(false);
  });

  test("Removing selected timer selects next timer, if first", () => {
    const initialLength = 3;

    const workout = createMockWorkout({
      plan: createMockPlan(initialLength),
      cursor: 0,
    });

    const selectedId = workout.plan[workout.cursor].id;
    const nextId = workout.plan[workout.cursor + 1].id;

    const removedId = selectedId;
    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer(workout, {
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

    const workout = createMockWorkout({
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    });

    const selectedId = workout.plan[workout.cursor].id;
    const removedId = workout.plan[initialCursor + 1].id;

    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer(workout, {
      id: removedId,
    });

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
    expect(updatedPlan[updatedCursor].id).toBe(selectedId);
  });

  test("Removing timer before selected timer doesn't change selection", () => {
    const initialCursor = 1;
    const initialLength = 3;

    const workout = createMockWorkout({
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    });

    const selectedId = workout.plan[workout.cursor].id;
    const removedId = workout.plan[workout.cursor - 1].id;

    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer(workout, {
      id: removedId,
    });

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
    expect(updatedPlan[updatedCursor].id).toBe(selectedId);
  });

  test("Removing selected timer selects previous timer, if last", () => {
    const initialLength = 3;
    const initialCursor = initialLength - 1;

    const workout = createMockWorkout({
      plan: createMockPlan(initialLength),
      cursor: initialCursor,
    });

    const selectedId = workout.plan[workout.cursor].id;
    const previousId = workout.plan[workout.cursor - 1].id;

    const removedId = selectedId;
    const { plan: updatedPlan, cursor: updatedCursor } = removeTimer(workout, {
      id: removedId,
    });

    const expectedCursor = initialCursor - 1;

    expect(updatedPlan.length).toBe(initialLength - 1);
    expect(updatedCursor).toBe(expectedCursor);
    expect(updatedPlan[updatedCursor].id).toBe(previousId);
    expect(updatedPlan).not.toContainEqual({ id: removedId });
  });
});
