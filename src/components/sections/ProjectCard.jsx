import { useState } from 'react';
import { TagList } from '../ui/Tag.jsx';
import { ExternalLink } from '../ui/ExternalLink.jsx';
import { GitHubIcon, ChevronDownIcon, ArrowUpRightIcon } from '../ui/Icons.jsx';

/**
 * Renders the screenshot, or a labelled placeholder if the image is missing.
 *
 * A broken-image icon on a portfolio reads as carelessness, so a screenshot
 * that hasn't been added yet degrades into something deliberate-looking. The
 * fixed aspect ratio also reserves the space before the image loads, which is
 * what keeps the card from shifting under the reader.
 */
function ScreenshotFrame({ src, alt }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="border-ink-700/70 bg-ink-850 relative aspect-[16/10] overflow-hidden rounded-xl border">
      {failed ? (
        <div className="text-ink-600 absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">Screenshot</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      )}
    </div>
  );
}

export function ProjectCard({ project }) {
  const { name, tagline, year, screenshot, liveUrl, repoUrl, stack, highlights, caseStudy } =
    project;

  return (
    <article className="group border-ink-700/60 bg-ink-900/50 hover:border-ink-600 hover:bg-ink-900 rounded-2xl border p-5 transition duration-300 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-6">
        <ScreenshotFrame src={screenshot} alt={`The ${name} interface`} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-xl">{name}</h3>
            <span className="text-ink-400 font-mono text-xs">{year}</span>
          </div>

          <p className="text-ink-400 mt-2 leading-relaxed">{tagline}</p>

          <ul className="text-ink-300 mt-4 space-y-1.5 text-sm">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <span aria-hidden="true" className="text-accent-400 mt-px flex-none">
                  ▹
                </span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <TagList items={stack} label={`${name} tech stack`} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {liveUrl ? (
              <ExternalLink href={liveUrl} className="text-accent-400 hover:text-accent-300">
                <span className="font-medium">Live site</span>
              </ExternalLink>
            ) : (
              // Better an honest label than a link that goes nowhere.
              <span className="text-ink-600 font-mono text-xs">Deploy pending</span>
            )}

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-300 hover:text-accent-400 inline-flex items-center gap-2 transition-colors"
            >
              <GitHubIcon />
              Source
              <ArrowUpRightIcon className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      <CaseStudy name={name} caseStudy={caseStudy} />
    </article>
  );
}

/**
 * Native <details> rather than a hand-rolled disclosure: it is keyboard
 * operable with Enter and Space, exposes its expanded state to assistive tech,
 * and is findable by in-page search — all for free and without JavaScript.
 */
function CaseStudy({ name, caseStudy }) {
  const entries = [
    { label: 'The problem', body: caseStudy.problem },
    { label: 'How I built it', body: caseStudy.approach },
    { label: 'The hard part', body: caseStudy.challenge },
    { label: 'What I took away', body: caseStudy.learned },
  ];

  return (
    <details className="border-ink-700/60 group/case mt-6 border-t pt-5">
      {/* `list-none` hides the default triangle everywhere except Safari,
          which needs the WebKit pseudo-element removed as well. */}
      <summary className="text-ink-300 hover:text-accent-400 flex cursor-pointer list-none items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors [&::-webkit-details-marker]:hidden">
        <ChevronDownIcon className="transition-transform duration-300 group-open/case:rotate-180" />
        <span className="group-open/case:hidden">Read the case study</span>
        <span className="hidden group-open/case:inline">Hide the case study</span>
        <span className="sr-only">for {name}</span>
      </summary>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {entries.map(({ label, body }) => (
          <div key={label}>
            <h4 className="text-accent-400 font-mono text-[0.7rem] tracking-[0.15em] uppercase">
              {label}
            </h4>
            <p className="text-ink-400 mt-2 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
