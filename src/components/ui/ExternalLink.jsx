import { ArrowUpRightIcon } from './Icons.jsx';

/**
 * An outbound link with a trailing arrow.
 *
 * `rel="noreferrer"` is not decoration: without `noopener` a new tab can reach
 * back through `window.opener`, and older browsers only honour it via that pair.
 */
export function ExternalLink({ href, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link text-ink-300 hover:text-accent-400 inline-flex items-center gap-1.5 transition-colors ${className}`}
      {...rest}
    >
      {children}
      <ArrowUpRightIcon className="transition-transform duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
    </a>
  );
}
