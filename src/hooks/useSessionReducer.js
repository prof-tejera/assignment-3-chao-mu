// React
import { useReducer, useEffect, useCallback } from "react";

// usehooks
import { useSessionStorage } from "@uidotdev/usehooks";

/**
 * Custom hook that combines `useReducer` with session storage to persist state.
 *
 * @template T - Type of the reducer's state.
 *
 * @param {object} params - Parameters for the hook.
 * @param {string} params.key - Key to identify the session storage entry.
 * @param {(state: T, action: any) => T} params.reducer - Reducer function for state updates.
 * @param {(state: T) => T} [params.transform]  Function to transform state.
 * @param {T} params.initialState - initial state if not found in session storage
 *
 * @returns {[T, Function, () => void]} - Returns the current state and dispatch function.
 */
const useSessionReducer = ({
  key,
  reducer,
  initialState,
  transform = (s) => s,
}) => {
  const [sessionState, setSessionState] = useSessionStorage(
    key,
    transform(initialState),
  );
  const [state, dispatch] = useReducer(reducer, sessionState);

  // We use a callback so we don't have to guess at dependencies each use
  const save = useCallback(() => {
    setSessionState(transform(state));
  }, [state, setSessionState, transform]);

  // Sync with sessionStorage on state change
  useEffect(() => {
    save();
  }, [save]);

  return [state, dispatch, save];
};

export default useSessionReducer;
