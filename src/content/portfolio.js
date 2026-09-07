// ---------------------------------------------------------------------------
// Every piece of copy on the site lives here.
//
// Components read from this file and never hold strings of their own, so
// updating the portfolio means editing one file rather than hunting through
// JSX. Anything marked TODO is a placeholder that still needs real content.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Spencer Bokor',
  role: 'Full-stack Developer',

  // The one line a recruiter reads before deciding whether to keep scrolling.
  pitch: 'I build full-stack web applications with React, Node and Postgres.',

  // Shown as a small badge under the pitch. null hides it entirely.
  availability: null,

  // TODO: replace with two or three real sentences. What got you into
  // building things, what you're studying, what you're drawn to technically.
  about: [
    'I got into programming because I kept running into small problems in my own life that ' +
      'software could obviously solve — and I wanted to be the one to solve them. Both of the ' +
      'projects below started that way.',
    'I like the parts of the job that are unglamorous: making an app fail gracefully when a ' +
      'service is down, keeping secrets out of a repo, writing the deploy doc so the next ' +
      'person is not stuck. I care more about shipping something that holds up than about ' +
      'using the newest framework.',
  ],

  email: 'spencerbokor07@gmail.com',
  phone: '0542354403',
  github: 'https://github.com/spencer-coder',
  githubUsername: 'spencer-coder',
  linkedin: 'https://www.linkedin.com/in/spencer-bokor', // TODO: confirm this URL
  resume: '/resume.pdf', // TODO: drop the real PDF into public/
};

// Sections rendered in the main column, in order. The sidebar nav and the
// scroll-spy both derive from this list, so adding a section here is enough.
export const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
];

// ---------------------------------------------------------------------------
// Projects
//
// `caseStudy.challenge` is the field that matters in an interview: one concrete
// technical decision and the reasoning behind it, not a feature list.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'runway',
    name: 'Runway',
    tagline: 'A personal budget tracker: set a monthly limit, log expenses, see what is left.',
    year: '2025',
    screenshot: '/screenshots/runway.png', // TODO: real screenshot
    liveUrl: null, // TODO: paste the deployed URL
    repoUrl: 'https://github.com/spencer-coder/Runway',
    stack: ['React', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Multer'],
    highlights: [
      'Email and password accounts with bcrypt-hashed credentials',
      'Receipt image uploads attached to individual expenses',
      'Monthly spending limits with live remaining-budget calculation',
    ],
    caseStudy: {
      problem:
        'I wanted to know how much of my monthly budget was actually left at any given moment, ' +
        'without opening a spreadsheet and adding things up. Existing apps either wanted bank ' +
        'credentials or buried the one number I cared about.',
      approach:
        'A REST API on Express with Mongoose models for users and expenses, and a React frontend ' +
        'that keeps a running total. Authentication is JWT-based: passwords are hashed with ' +
        'bcrypt before they ever reach the database, and every expense route is scoped to the ' +
        'authenticated user so one account can never read another account’s data.',
      challenge:
        'Receipt uploads were the interesting part. Handling multipart form data meant adding ' +
        'Multer and writing files to an uploads directory — which immediately raised the ' +
        'question of what belongs in version control. The directory has to exist for the server ' +
        'to boot, but the receipts inside it are personal and must never be committed. I also ' +
        'had to make the API reject anything that was not an image rather than trusting the ' +
        'filename the browser sent.',
      learned:
        'That the security-relevant parts of a small app are mostly boring discipline: hash ' +
        'before storing, scope every query to the current user, validate uploads server-side, ' +
        'and keep secrets in environment variables rather than in the repo.',
    },
  },
  {
    slug: 'formfit',
    name: 'FormFit',
    tagline: 'A home-workout companion focused on how to do each exercise, not just what to do.',
    year: '2025',
    screenshot: '/screenshots/formfit.png', // TODO: real screenshot
    liveUrl: null, // TODO: paste the deployed Vercel URL
    repoUrl: 'https://github.com/spencer-coder/formfit',
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'Postgres', 'Vercel'],
    highlights: [
      '36 exercises with form cues and the mistakes people actually make',
      'Browse by muscle group and difficulty, with progress tracked locally',
      'Admin screen for editing the exercise library, behind a passcode gate',
    ],
    caseStudy: {
      problem:
        'Most workout apps tell you to do three sets of ten and stop there. If you are training ' +
        'at home with nobody watching, the thing you actually need is what good form looks like ' +
        'and which mistake you are probably making.',
      approach:
        'Exercises live in Supabase Postgres with images in Supabase Storage, so the library can ' +
        'be edited without a redeploy. The frontend is React 19 on Vite with Tailwind v4, and ' +
        'all database access goes through a single module rather than being scattered across ' +
        'components — which made it straightforward to add caching and error handling in one place.',
      challenge:
        'Vite bakes environment variables into the bundle at build time, so a missing key does ' +
        'not fail loudly — it produces an app that renders a blank white screen in production ' +
        'with nothing in the console to explain it. I made the app detect unconfigured ' +
        'credentials at startup and render an explicit "Supabase is not configured" state ' +
        'instead. It turned the worst class of bug to diagnose into a message that tells you ' +
        'exactly what to fix.',
      learned:
        'To design for the failure path first. Every external service the app depends on will be ' +
        'unavailable or misconfigured at some point, and deciding in advance what the user sees ' +
        'when that happens is cheaper than debugging a blank page later.',
    },
  },
];

// ---------------------------------------------------------------------------
// Skills
//
// Grouped honestly rather than as a logo wall. No percentage bars — they only
// invite the question "eighty percent of what?".
// ---------------------------------------------------------------------------

export const skills = [
  {
    title: 'Comfortable with',
    note: 'Used to build and ship the projects above.',
    items: [
      'JavaScript (ES2023)',
      'React',
      'Node.js',
      'Express',
      'MongoDB / Mongoose',
      'Postgres / Supabase',
      'Tailwind CSS',
      'Vite',
      'REST APIs',
      'Git',
      'Vercel',
    ],
  },
  {
    title: 'Currently learning',
    note: 'Actively working through these.',
    items: ['TypeScript', 'Testing (Vitest)', 'Next.js', 'SQL query performance', 'Docker'],
  },
];

// Shown when the GitHub API is unavailable — rate limited, offline, or blocked.
// The activity section renders these instead of an error.
export const fallbackRepos = projects.map((project) => ({
  id: project.slug,
  name: project.repoUrl.split('/').pop(),
  description: project.tagline,
  html_url: project.repoUrl,
  language: project.stack[0],
  stargazers_count: 0,
  pushed_at: null,
}));
