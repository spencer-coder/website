/** A small stack chip. Purely presentational — the list it sits in carries the meaning. */
export function Tag({ children }) {
  return (
    <li className="border-ink-700 bg-ink-850 text-ink-300 rounded-md border px-2 py-1 font-mono text-[0.7rem] tracking-tight">
      {children}
    </li>
  );
}

export function TagList({ items, label }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
