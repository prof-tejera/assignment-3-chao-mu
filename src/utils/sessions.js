// uuid
import { v4 as uuidv4 } from "uuid";

/**
 * @typedef {Object} StorageKey
 * @property {string} sessionId
 * @property {string} subkey
 */

export const sessionIdSessionStorageKey = "sessionId";

const sessionIdField = "session";
const subkeyField = "subkey";
const fieldSep = "::";

const createSessionId = () => uuidv4();

/**
 * @returns {string}
 */
export const getOrCreateSessionId = () => {
  const key = sessionIdSessionStorageKey;
  const existingId = sessionStorage.getItem(key);

  if (existingId) {
    return existingId;
  }

  // If not, create a new one and store it in session storage.
  const newId = createSessionId();
  sessionStorage.setItem(key, newId);

  return newId;
};

export const clearSessionId = () => {
  sessionStorage.removeItem("sessionId");
};

/**
 * @param {StorageKey} param0
 * @returns {string}
 */
export const serializeStorageKey = ({ sessionId, subkey }) => {
  return [sessionIdField, sessionId, subkeyField, subkey]
    .map((el) => String(el))
    .join(fieldSep);
};

/**
 * @param {string} storageKey
 * @returns {StorageKey}
 */
export const deserializeStorageKey = (storageKey) => {
  const [parsedSessionIdField, sessionId, parsedSubkeyField, subkey] =
    storageKey.split(fieldSep);

  if (
    parsedSessionIdField !== sessionIdField ||
    parsedSubkeyField !== subkeyField
  ) {
    throw new Error(`Invalid storage key: ${storageKey}`);
  }

  return { sessionId, subkey };
};
