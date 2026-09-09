const VARIANTS = {
  primary:
    'bg-accent-500 text-ink-950 hover:bg-accent-400 font-semibold shadow-lg shadow-accent-500/20',
  secondary: 'border border-ink-700 bg-ink-900 text-ink-100 hover:bg-ink-800 hover:border-ink-600',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

export function Button({ variant = 'primary', href, className = '', children, ...rest }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
