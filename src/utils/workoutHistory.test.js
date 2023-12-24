// Vitest
import { describe, test, expect, beforeEach } from "vitest";

// Ours - Types
import { createWorkout } from "@/types/workout";

// Ours - Utils
import {
  getGlobalWorkoutHistory,
  combineWorkoutHistories,
  getStoredWorkoutHistories,
  updateWorkoutHistory,
  getWorkoutHistoryKeys,
  sortedWorkoutHistory,
} from "@/utils/workoutHistory";
import { serializeStorageKey, storeValue } from "@/utils/storage";

describe("workout history", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("end to end", () => {
    expect(getGlobalWorkoutHistory()).toEqual([]);

    const workoutHistoryA = [
      { ...createWorkout(), completed: true, completedAt: 1 },
      { ...createWorkout(), completed: true, completedAt: 2 },
      { ...createWorkout(), completed: true, completedAt: 3 },
    ];

    const storageKeyA = { subkey: "workoutHistory", sessionId: "foo" };

    storeValue(storageKeyA, workoutHistoryA);

    expect(getWorkoutHistoryKeys()).toEqual([storageKeyA]);

    const newWorkouts = [
      { ...createWorkout(), completed: true, completedAt: 4 },
      { ...createWorkout(), completed: true, completedAt: 5 },
      { ...createWorkout(), completed: true, completedAt: 6 },
    ];

    let workoutHistoryB = [];
    for (const workout of newWorkouts) {
      workoutHistoryB = updateWorkoutHistory(workoutHistoryB, workout);
    }

    expect(workoutHistoryB).toEqual(newWorkouts);

    const storageKeyB = { subkey: "workoutHistory", sessionId: "bar" };

    storeValue(storageKeyB, workoutHistoryB);

    const storageKeys = getWorkoutHistoryKeys();
    expect(storageKeys.length).toBe(2);
    expect(storageKeys).toContainEqual(storageKeyA);
    expect(storageKeys).toContainEqual(storageKeyB);

    expect(getStoredWorkoutHistories()).toHaveLength(2);

    const expectedHistory = sortedWorkoutHistory([
      ...workoutHistoryA,
      ...workoutHistoryB,
    ]);
    const actualHistory = sortedWorkoutHistory(getGlobalWorkoutHistory());

    expect(actualHistory).toEqual(expectedHistory);
  });
});
