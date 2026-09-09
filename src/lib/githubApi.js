// Unauthenticated, so no token ships to the browser: 60 requests/hour per IP.

const API_ROOT = 'https://api.github.com';

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

  return repos.filter((repo) => !repo.fork).map(toRepoSummary);
}
