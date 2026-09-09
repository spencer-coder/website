import { Section } from '../layout/Section.jsx';
import { TagList } from '../ui/Tag.jsx';
import { skills } from '../../content/portfolio.js';

export function Skills() {
  return (
    <Section id="skills" eyebrow="03 / Skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.title} className="border-ink-700/60 bg-ink-900/50 rounded-2xl border p-5">
            <h3 className="text-base">{group.title}</h3>
            {group.note && <p className="text-ink-400 mt-1 text-sm">{group.note}</p>}
            <div className="mt-4">
              <TagList items={group.items} label={group.title} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
