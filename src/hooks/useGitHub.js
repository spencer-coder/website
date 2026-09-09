import { useEffect, useState } from 'react';
import { fetchRecentRepos } from '../lib/githubApi.js';
import { readCache, writeCache } from '../lib/cache.js';
import { fallbackRepos } from '../content/portfolio.js';

const CACHE_KEY = 'portfolio:github-repos';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

// Cache plus a static fallback, so this section can never render an error.
// `stale` says which one the data came from.
export function useGitHub(username) {
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
