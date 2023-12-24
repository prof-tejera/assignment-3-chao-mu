// React
import { useReducer, useEffect, useCallback } from "react";

// Ours - Hooks
import useStorage from "@/hooks/useStorage";
import { getOrCreateSessionId } from "@/utils/storage";

/**
 * Custom hook that combines `useReducer` with local storage to persist in a simulated session,
 * the way session storage works, except it will persist across tabs and windows if needed.
 *
 * @template T - Type of the reducer's state.
 *
 * @param {object} params - Parameters for the hook.
 * @param {string} params.subkey - Key to identify which storage entry within our session
 * @param {(state: T, action: any) => T} params.reducer - Reducer function for state updates.
 * @param {(state: T) => T} [params.transform]  Function to transform state.
 * @param {T} params.initialState - initial state if not found in session storage
 *
 * @returns {[T, Function, () => void]} - Returns the current state and dispatch function.
 */
const useSessionReducer = ({
  subkey,
  reducer,
  initialState,
  transform = (s) => s,
}) => {
  const storageKey = {
    sessionId: getOrCreateSessionId(),
    subkey,
  };

  const [storedState, setStoredState] = useStorage(
    storageKey,
    transform(initialState),
  );
  const [state, dispatch] = useReducer(reducer, storedState);

  // We use a callback so we don't have to guess at dependencies each use
  const save = useCallback(() => {
    setStoredState(transform(state));
  }, [state, setStoredState, transform]);

  // Sync with session storage on state change
  useEffect(() => {
    save();
  }, [state, save]);

  return [state, dispatch, save];
};

export default useSessionReducer;
