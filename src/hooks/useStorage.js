// usehooks
import { useLocalStorage } from "@uidotdev/usehooks";

// Ours - Utils
import { serializeStorageKey } from "@/utils/sessions";

/**
 * Use this session's storage with the given key.
 *
 * @param {import("@/utils/sessions").StorageKey} storageKey
 * @param {Object} defaultState
 */
const useStorage = (storageKey, defaultState) => {
  const key = serializeStorageKey(storageKey);

  return useLocalStorage(key, defaultState);
};

export default useStorage;
