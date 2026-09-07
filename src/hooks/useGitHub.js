import { useEffect, useState } from 'react';
import { fetchRecentRepos } from '../lib/githubApi.js';
import { readCache, writeCache } from '../lib/cache.js';
import { fallbackRepos } from '../content/portfolio.js';

const CACHE_KEY = 'portfolio:github-repos';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Recently-pushed public repos, with two layers of protection so that a
 * recruiter never sees an error where the activity section should be:
 *
 *   1. A cached copy is served immediately and only revalidated once the TTL
 *      expires, which keeps normal traffic well under the 60 requests/hour the
 *      unauthenticated API allows per IP.
 *   2. Any failure — rate limit, offline, DNS, blocked request — falls back to
 *      the static project list. The section renders less, never broken.
 *
 * `stale` reports which of those happened so the UI can label the data
 * honestly rather than implying it is live when it isn't.
 */
export function useGitHub(username) {
  // Read the cache once and derive both pieces of initial state from it, so a
  // returning visitor sees repos on the first paint with no loading flash.
  const cached = useState(() => readCache(CACHE_KEY, CACHE_TTL))[0];

  const [repos, setRepos] = useState(cached);
  const [loading, setLoading] = useState(cached === null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    if (!username) {
      setRepos(fallbackRepos);
      setStale(true);
      setLoading(false);
      return;
    }

    // A fresh cache entry is authoritative — skip the network entirely.
    if (readCache(CACHE_KEY, CACHE_TTL)) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let active = true;

    fetchRecentRepos(username, { signal: controller.signal })
      .then((data) => {
        if (!active) return;
        setRepos(data);
        setStale(false);
        writeCache(CACHE_KEY, data);
      })
      .catch((error) => {
        if (!active || error.name === 'AbortError') return;
        // Deliberately not surfaced to the visitor; the fallback covers it.
        setRepos(fallbackRepos);
        setStale(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [username]);

  return { repos: repos ?? [], loading, stale };
}
