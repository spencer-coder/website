/**
 * Wraps every section so the anchor id, heading level and spacing are declared
 * in one place rather than repeated five times.
 *
 * `aria-labelledby` ties the region to its own heading, which is what lets a
 * screen reader announce "Projects, region" when jumping between landmarks.
 */
export function Section({ id, eyebrow, title, children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-8 py-14 lg:py-20">
      <header className="mb-8">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 id={headingId} className="text-2xl sm:text-3xl">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
