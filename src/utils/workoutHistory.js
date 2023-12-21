import { getAllStorageKeys, getStoredValue } from "./storage";

export const workoutHistorySubkey = "workoutHistory";

export const getWorkoutHistoryKeys = () =>
  getAllStorageKeys().filter((key) => key.subkey === workoutHistorySubkey);

export const getStoredWorkoutHistories = () =>
  getWorkoutHistoryKeys().map((key) => getStoredValue(key));

export const combineWorkoutHistories = (workoutHistories) =>
  workoutHistories.reduce((acc, history) => [...acc, ...history], []);

export const getGlobalWorkoutHistory = () =>
  combineWorkoutHistories(getStoredWorkoutHistories());

export const updateWorkoutHistory = (workoutHistory, workout) => {
  if (!workout.completedAt) {
    return workoutHistory;
  }

  if (workoutHistory.find((w) => w.completedAt === workout.completedAt)) {
    return workoutHistory;
  }

  return [...workoutHistory, workout];
};

export const createWorkoutHistory = () => [];

export const sortedWorkoutHistory = (workoutHistory) =>
  workoutHistory.sort((a, b) => b.completedAt - a.completedAt);
