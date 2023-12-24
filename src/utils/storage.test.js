// Jest
import { describe, test, expect, beforeEach } from "vitest";

// Ours - Tested functions
import {
  serializeStorageKey,
  deserializeStorageKey,
  getOrCreateSessionId,
  clearSessionId,
  sessionIdSessionStorageKey,
} from "./storage";

const createMockStorageKey = ({
  sessionId = "abc123",
  subkey = "funData",
} = {}) => ({
  sessionId,
  subkey,
});

describe("storage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("serialize/deserialize symetry", () => {
    const storageKey = createMockStorageKey();
    const serialized = serializeStorageKey(storageKey);

    expect(serialized).toBeTypeOf("string");

    const deserialized = deserializeStorageKey(serialized);

    expect(deserialized).toEqual(storageKey);
  });

  test("getOrCreateSessionId", () => {
    const key = sessionIdSessionStorageKey;

    const originalSessionId = getOrCreateSessionId();
    expect(originalSessionId).toBeTypeOf("string");

    expect(originalSessionId).toBe(sessionStorage.getItem(key));

    const subsequentSessionId = getOrCreateSessionId();
    expect(originalSessionId).toBe(sessionStorage.getItem(key));

    expect(subsequentSessionId).toBe(originalSessionId);

    sessionStorage.removeItem(key);

    const newSessionId = getOrCreateSessionId();
    expect(newSessionId).not.toBe(originalSessionId);
    expect(originalSessionId).toBeTypeOf("string");
    expect(newSessionId).toBe(sessionStorage.getItem(key));
  });

  test("clearSessionId", () => {
    const originalSessionId = getOrCreateSessionId();

    clearSessionId();

    const subsequentSessionId = getOrCreateSessionId();

    expect(originalSessionId).not.toBe(subsequentSessionId);
  });
});
