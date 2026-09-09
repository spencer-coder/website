import { Section } from '../layout/Section.jsx';
import { profile } from '../../content/portfolio.js';

export function About() {
  return (
    <Section id="about" eyebrow="02 / About" title="A little background">
      <div className="max-w-2xl space-y-4">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-ink-400 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
