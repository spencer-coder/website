import { Section } from '../layout/Section.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import { projects } from '../../content/portfolio.js';

// Projects lead the page rather than sitting behind an about section: they are
// the strongest evidence, and a recruiter scanning for well under a minute
// should hit them first.
export function Projects() {
  return (
    <Section id="projects" eyebrow="01 — Work" title="Things I've built and shipped">
      <p className="text-ink-400 -mt-4 mb-8 max-w-2xl leading-relaxed">
        Two applications, both taken from an idea to a deployed site with real accounts and a real
        database. Each one opens into a short case study covering the decisions behind it.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
