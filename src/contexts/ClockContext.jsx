// React
import { createContext, useContext } from "react";

// Ours - Reducer
import { useClockReducer } from "@/reducers/clockReducer";

const ClockContext = createContext(null);
const ClockDispatchContext = createContext(null);

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
  const [clock, dispatch] = useClockReducer();

  return (
    <ClockContext.Provider value={clock}>
      <ClockDispatchContext.Provider value={dispatch}>
        {children}
      </ClockDispatchContext.Provider>
    </ClockContext.Provider>
  );
};
