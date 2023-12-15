import { useContext } from "react";

import PlanContext from "./PlanContext";

const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }

  return context;
};

export default usePlanContext;
