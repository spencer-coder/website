import { useState } from 'react';
import { TagList } from '../ui/Tag.jsx';
import { ExternalLink } from '../ui/ExternalLink.jsx';
import { GitHubIcon, ChevronDownIcon, ArrowUpRightIcon } from '../ui/Icons.jsx';

function ScreenshotFrame({ src, alt, size }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="border-ink-700/70 bg-ink-850 text-ink-600 flex aspect-[16/10] items-center justify-center rounded-xl border">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">Screenshot</span>
      </div>
    );
  }

  return (
    <div className="border-ink-700/70 bg-ink-850 overflow-hidden rounded-xl border">
      {/* width/height reserve the space, so the text below never jumps. */}
      <img
        src={src}
        alt={alt}
        width={size?.width}
        height={size?.height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

export function ProjectCard({ project }) {
  const {
    name,
    tagline,
    year,
    screenshot,
    screenshotSize,
    liveUrl,
    liveNote,
    repoUrl,
    stack,
    highlights,
    caseStudy,
  } = project;

  return (
    <article className="group border-ink-700/60 bg-ink-900/50 hover:border-ink-600 hover:bg-ink-900 rounded-2xl border p-5 transition duration-300 sm:p-6">
      <ScreenshotFrame src={screenshot} size={screenshotSize} alt={`The ${name} interface`} />

      <div className="mt-5">
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

        {liveUrl && liveNote && (
          <p className="text-ink-400/80 border-ink-700/60 mt-3 border-l-2 py-0.5 pl-3 text-xs leading-relaxed">
            {liveNote}
          </p>
        )}
      </div>

      <CaseStudy name={name} caseStudy={caseStudy} />
    </article>
  );
}

function CaseStudy({ name, caseStudy }) {
  const entries = [
    { label: 'The problem', body: caseStudy.problem },
    { label: 'How I built it', body: caseStudy.approach },
    { label: 'The hard part', body: caseStudy.challenge },
    { label: 'Known flaws', body: caseStudy.flaws },
    // An unfilled field is dropped, so it cannot leave a heading with nothing under it.
  ].filter(({ body }) => (Array.isArray(body) ? body.length > 0 : Boolean(body?.trim())));

  return (
    <details className="border-ink-700/60 group/case mt-6 border-t pt-5">
      {/* Safari needs the WebKit marker removed as well as `list-none`. */}
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

            {Array.isArray(body) ? (
              <ul className="text-ink-400 mt-2 space-y-1.5 text-sm">
                {body.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-ink-600 mt-px flex-none">
                      ▹
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-400 mt-2 text-sm leading-relaxed">{body}</p>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
