// React
import { createContext, useContext } from "react";

// Ours - Reducer
import { clockReducer } from "@/reducers/clockReducer";

// Ours - Hooks
import useSessionReducer from "@/hooks/useSessionReducer";
import useInterval from "@/hooks/useInterval";

// Ours - Types
import { createClock, pauseClock } from "@/types/clock";

const ClockContext = createContext(null);
const ClockDispatchContext = createContext(null);

/**
 * @returns {import('@/types/clock').Clock}
 */
export const useClockContext = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClockContext must be used within a ClockProvider");
  }

  return context;
};

export const useClockDispatchContext = () => {
  const context = useContext(ClockDispatchContext);
  if (!context) {
    throw new Error(
      "useClockDispatchContext must be used within a ClockProvider",
    );
  }

  return context;
};

export const ClockProvider = ({ children }) => {
  const [clock, dispatch, save] = useSessionReducer({
    subkey: "clock",
    reducer: clockReducer,
    initialState: createClock(),
    transform: (clock) => pauseClock(clock),
  });

  useInterval(() => {
    save();
  }, 1000);

  return (
    <ClockContext.Provider value={clock}>
      <ClockDispatchContext.Provider value={dispatch}>
        {children}
      </ClockDispatchContext.Provider>
    </ClockContext.Provider>
  );
};
