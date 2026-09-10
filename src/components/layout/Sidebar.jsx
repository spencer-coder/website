import { profile, navigation } from '../../content/portfolio.js';
import { GitHubIcon, LinkedInIcon, MailIcon, DocumentIcon, PhoneIcon } from '../ui/Icons.jsx';

export function Sidebar({ activeId }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-88 lg:flex-none lg:flex-col lg:justify-between lg:py-16 xl:w-104">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">{profile.name}</h1>
        <p className="text-accent-400 mt-2 font-mono text-sm tracking-tight">{profile.role}</p>

        <p className="text-ink-400 mt-5 max-w-sm leading-relaxed text-balance">{profile.pitch}</p>

        {profile.availability && (
          <p className="border-accent-500/25 bg-accent-500/10 text-accent-300 mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
            <span
              aria-hidden="true"
              className="bg-accent-400 size-1.5 flex-none rounded-full shadow-[0_0_0_3px] shadow-accent-400/20"
            />
            {profile.availability}
          </p>
        )}

        <SidebarNav activeId={activeId} />
      </div>

      <SidebarLinks />
    </header>
  );
}

function SidebarNav({ activeId }) {
  return (
    <nav aria-label="Sections" className="mt-10 lg:mt-16">
      <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-1">
        {navigation.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex items-center gap-3 py-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors ${
                  isActive ? 'text-ink-100' : 'text-ink-400 hover:text-ink-100'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`hidden h-px transition-all duration-300 lg:block ${
                    isActive
                      ? 'bg-accent-400 w-12'
                      : 'bg-ink-600 group-hover:bg-ink-400 w-6 group-hover:w-10'
                  }`}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SidebarLinks() {
  const links = [
    { href: profile.github, label: 'GitHub', Icon: GitHubIcon },
    { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: profile.cv, label: 'CV', Icon: DocumentIcon },
    { href: `mailto:${profile.email}`, label: 'Email', Icon: MailIcon },
    profile.phone && { href: `tel:${profile.phone}`, label: 'Phone', Icon: PhoneIcon },
  ].filter(Boolean);

  return (
    <ul className="mt-10 flex items-center gap-2 lg:mt-0">
      {links.map(({ href, label, Icon }) => {
        const isExternal = href.startsWith('http');

        return (
          <li key={label}>
            <a
              href={href}
              title={label}
              aria-label={label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-ink-400 hover:text-accent-400 hover:border-ink-600 hover:bg-ink-850 border-ink-700/70 flex size-10 items-center justify-center rounded-xl border text-lg transition"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
