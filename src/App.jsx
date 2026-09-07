import { useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { About } from './components/sections/About.jsx';
import { Skills } from './components/sections/Skills.jsx';
import { GitHubActivity } from './components/sections/GitHubActivity.jsx';
import { Contact } from './components/sections/Contact.jsx';
import { useActiveSection } from './hooks/useActiveSection.js';
import { navigation, profile } from './content/portfolio.js';

export default function App() {
  // Memoised because `useActiveSection` depends on this array by identity; a
  // fresh array every render would tear down and rebuild the observer.
  const sectionIds = useMemo(() => navigation.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-6 py-14 sm:px-8 lg:flex lg:gap-14 lg:py-0 xl:gap-20">
      <a
        href="#main"
        className="bg-accent-500 text-ink-950 sr-only rounded-lg px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>

      <Sidebar activeId={activeId} />

      <main id="main" tabIndex={-1} className="min-w-0 flex-1 lg:py-16">
        <Projects />
        <About />
        <Skills />
        <GitHubActivity />
        <Contact />

        <footer className="border-ink-700/60 text-ink-400 border-t py-8 font-mono text-xs">
          <p>Built by {profile.name} with React, Vite and Tailwind CSS. Deployed on Vercel.</p>
        </footer>
      </main>
    </div>
  );
}
