# Portfolio

Personal portfolio site — projects, case studies and contact.

**Stack:** React 19, Vite 7, Tailwind CSS 4. No router, no CMS, no backend. Deployed on Vercel.

---

## Quick start

```bash
npm install
cp .env.example .env      # optional — see below
npm run dev
```

Opens on <http://localhost:5174>.

The site runs fine with no `.env` at all. The contact form falls back to a mailto block and the
activity section falls back to static data, both deliberately.

---

## Editing the content

**All copy lives in [`src/content/portfolio.js`](src/content/portfolio.js).** Components read from
it and hold no strings of their own, so updating the site never means editing JSX.

| To change                                          | Edit         |
| -------------------------------------------------- | ------------ |
| Name, pitch, availability badge, about text, links | `profile`    |
| Which sections exist and their order               | `navigation` |
| Projects, stacks, case studies                     | `projects`   |
| Skill groups                                       | `skills`     |

Search the file for `TODO` — those are the placeholders still waiting on real content.

Adding a section means adding an entry to `navigation`, writing a component that wraps its content
in `<Section id="...">`, and rendering it in `App.jsx`. The sidebar nav and the scroll-spy both
derive from `navigation`, so neither needs touching.

---

## Assets to drop in

| File                             | Notes                                           |
| -------------------------------- | ----------------------------------------------- |
| `public/resume.pdf`              | Linked from the sidebar and the contact section |
| `public/screenshots/runway.png`  | 16:10 crop reads best                           |
| `public/screenshots/formfit.png` | 16:10 crop reads best                           |
| `public/og-image.png`            | 1200×630 — the social preview card              |

A missing screenshot renders a labelled placeholder rather than a broken image icon, so these can
land whenever.

---

## Architecture

```
src/
├── main.jsx                    entry point
├── App.jsx                     layout shell, section order, skip link
├── index.css                   Tailwind v4 design tokens (@theme)
│
├── content/
│   └── portfolio.js            every string on the site
│
├── lib/
│   ├── githubApi.js            GitHub REST calls
│   └── cache.js                TTL wrapper over localStorage
│
├── hooks/
│   ├── useGitHub.js            repo data, caching, fallback
│   └── useActiveSection.js     scroll-spy for the sidebar nav
│
└── components/
    ├── layout/                 Sidebar, Section
    ├── sections/               one per page section
    └── ui/                     Button, Tag, Icons, ExternalLink
```

### Two decisions worth knowing

**The GitHub section cannot show an error.** The unauthenticated API allows 60 requests/hour per
IP. Responses are cached in `localStorage` for six hours, and any failure — rate limit, offline,
blocked request — silently falls back to the static project list in `portfolio.js`. A visitor sees
less, never something broken.

**A missing form endpoint is visible, not silent.** With `VITE_FORMSPREE_ENDPOINT` unset, a form
that still rendered would look identical to a working one while swallowing every message. Instead
the section renders a mailto block. Same reasoning as FormFit's "Supabase is not configured"
screen.

---

## Contact form

Create a form at [formspree.io](https://formspree.io), then put its endpoint in `.env`:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

The free tier covers 50 submissions per month. The form posts JSON directly from the browser —
there is no server here to hold a secret, which is why an endpoint URL rather than an API key is
the right shape for this.

Submissions are protected by a hidden `_gotcha` honeypot field. If a send fails, the error message
includes a direct mailto so a network problem never costs a real contact.
