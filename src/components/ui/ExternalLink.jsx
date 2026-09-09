import { ArrowUpRightIcon } from './Icons.jsx';

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
