// react-router-dom
import { useSearchParams, useSearchParam } from "react-router-dom";

const SessionIdParamRoute = ({ children }) => {
  const { sessionId } = useSearchParams();

  return children(sessionId);
};
