// localStorage throws in private browsing, so every access is guarded.

export function readCache(key, maxAgeMs) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const { storedAt, value } = JSON.parse(raw);
    if (typeof storedAt !== 'number' || Date.now() - storedAt > maxAgeMs) return null;

    return value;
  } catch {
    return null;
  }
}

export function writeCache(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ storedAt: Date.now(), value }));
  } catch {
    // Losing the cache is fine; losing the page is not.
  }
}
