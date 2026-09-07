import { Section } from '../layout/Section.jsx';
import { ExternalLink } from '../ui/ExternalLink.jsx';
import { StarIcon } from '../ui/Icons.jsx';
import { useGitHub } from '../../hooks/useGitHub.js';
import { profile } from '../../content/portfolio.js';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || profile.githubUsername;

function formatPushedAt(timestamp) {
  if (!timestamp) return null;

  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return null;

  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function GitHubActivity() {
  const { repos, loading, stale } = useGitHub(USERNAME);

  return (
    <Section id="activity" eyebrow="04 — Activity" title="What I'm working on now">
      <p className="text-ink-400 -mt-4 mb-8 max-w-2xl leading-relaxed">
        {stale
          ? 'My public repositories on GitHub.'
          : 'Pulled live from the GitHub API, so this stays current without me editing the page.'}
      </p>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}

      <p className="mt-6">
        <ExternalLink href={profile.github} className="text-sm">
          All repositories on GitHub
        </ExternalLink>
      </p>
    </Section>
  );
}

function RepoCard({ repo }) {
  const pushed = formatPushedAt(repo.pushed_at);

  return (
    <li className="border-ink-700/60 bg-ink-900/50 hover:border-ink-600 hover:bg-ink-900 rounded-xl border p-4 transition">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent-400 text-ink-100 font-mono text-sm font-medium transition-colors"
      >
        {repo.name}
      </a>

      {repo.description && (
        <p className="text-ink-400 mt-2 line-clamp-2 text-sm leading-relaxed">{repo.description}</p>
      )}

      <div className="text-ink-400 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="bg-accent-400/70 size-1.5 rounded-full" />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <StarIcon className="text-[0.9em]" />
            {repo.stargazers_count}
            <span className="sr-only">stars</span>
          </span>
        )}
        {pushed && <span>Updated {pushed}</span>}
      </div>
    </li>
  );
}

/** Reserves the real card height so the section doesn't jump when data lands. */
function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className="border-ink-700/60 bg-ink-900/40 h-[7.5rem] animate-pulse rounded-xl border"
        />
      ))}
    </div>
  );
}
