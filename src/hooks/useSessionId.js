// React
import { useState } from "react";

// react-router-dom
import { useSearchParams } from "react-router-dom";

// uuid
import { v4 as uuidv4 } from "uuid";

/**
 * Return this session's id or create a new one if it doesn't exist.
 *
 * @param {string} [overrideSessionId] force this session id
 *
 * @returns {string}
 */
const useSessionId = (overrideSessionId) => {
  // Let url parameters override the session id.

  const [sessionId] = useState(
    overrideSessionId ||
      (() => {
        // Check if a session id already exists in session storage.
        const existingId = sessionStorage.getItem("sessionId");
        if (existingId) {
          return existingId;
        }

        // If not, create a new one and store it in session storage.
        const newId = "SessionIdPrefix" + uuidv4();
        sessionStorage.setItem("sessionId", newId);

        return newId;
      }),
  );

  return sessionId;
};

export default useSessionId;
