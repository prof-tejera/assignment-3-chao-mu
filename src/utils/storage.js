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
// Increment v to ignore old keys.
const storageKeyPrefix = "STORAGE_KEY-v4";

export const getAllStorageKeys = () => {
  const keys = Object.keys(localStorage)
    .filter((key) => key.startsWith(storageKeyPrefix + fieldSep))
    .map((key) => deserializeStorageKey(key));

  return keys;
};

export const storeValue = (storageKey, value) =>
  localStorage.setItem(serializeStorageKey(storageKey), JSON.stringify(value));

export const getStoredValue = (storageKey) =>
  JSON.parse(localStorage.getItem(serializeStorageKey(storageKey)));

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
  return [storageKeyPrefix, sessionIdField, sessionId, subkeyField, subkey]
    .map((el) => String(el))
    .join(fieldSep);
};

/**
 * @param {string} storageKey
 * @returns {StorageKey}
 */
export const deserializeStorageKey = (storageKey) => {
  const [
    parsedStorageKeyPrefix,
    parsedSessionIdField,
    sessionId,
    parsedSubkeyField,
    subkey,
  ] = storageKey.split(fieldSep);

  if (
    parsedSessionIdField !== sessionIdField ||
    parsedSubkeyField !== subkeyField
  ) {
    throw new Error(
      `Invalid storage key: ${storageKey}. Parsed: sessionIdFieldName=${parsedSessionIdField}, sessionId=${sessionId}, subkeyFieldName=${parsedSubkeyField}  subkey={subkey}`,
    );
  }

  return { sessionId, subkey };
};
