// ---------------------------------------------------------------------------
// Live repository data from the public GitHub REST API.
//
// Unauthenticated, so there is no token in this repo and none needs to reach
// the browser. That caps us at 60 requests per hour per IP, which is plenty for
// a portfolio but is not a guarantee — see `useGitHub` for the cache and the
// fallback that make a rate limit invisible to a visitor.
// ---------------------------------------------------------------------------

const API_ROOT = 'https://api.github.com';

/** Repos are trimmed to the fields the UI renders — the raw payload is ~100 keys each. */
function toRepoSummary(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    pushed_at: repo.pushed_at,
  };
}

export async function fetchRecentRepos(username, { limit = 6, signal } = {}) {
  const url = `${API_ROOT}/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=${limit}`;

  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded ${response.status}`);
  }

  const repos = await response.json();
  if (!Array.isArray(repos)) throw new Error('Unexpected GitHub API response');

  // Forks are somebody else's work and say nothing about what Spencer builds.
  return repos.filter((repo) => !repo.fork).map(toRepoSummary);
}
