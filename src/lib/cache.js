// ---------------------------------------------------------------------------
// A tiny TTL cache over localStorage.
//
// Every access is wrapped in try/catch on purpose: localStorage throws rather
// than returning null in private browsing and when a browser is set to block
// site data, and a portfolio must not white-screen because someone opened it in
// an incognito window.
// ---------------------------------------------------------------------------

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
    // A full quota or blocked storage costs us the cache, not the page.
  }
}
